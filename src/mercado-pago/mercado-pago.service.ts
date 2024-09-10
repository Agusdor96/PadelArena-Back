/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { Payment, Preference } from 'mercadopago';
import { client } from '../config/mercadopago';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/paymentDetail.entity';
import { Repository } from 'typeorm';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { User } from '../user/entities/user.entity';
import * as crypto from 'crypto';
import { InscriptionEnum } from '../tournament/tournament.enum';

@Injectable()
export class MercadoPagoService {
  constructor(
    @InjectRepository(PaymentDetail)
    private paymentDetailRepository: Repository<PaymentDetail>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(User)
    private userRepsoitory: Repository<User>,
  ) {}
  async mpConnections(req: dataPaymentDto) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: req.tournament },
      relations:{category:true}
    });

    if (!tournament) {
      throw new NotFoundException('No se encontró el torneo');
    }
    if(tournament.inscription === InscriptionEnum.CLOSED) throw new BadRequestException("Este torneo ha cerrado sus inscripciones")

    const user = await this.userRepsoitory.findOne({ where: { id: req.user }, relations:{category:true} });
    if (!user) {
      throw new NotFoundException('No se encontró al usuario');
    }
    console.log(user.category.name, "?=", tournament.category.name);
    
    if(user.category.name !== tournament.category.name) throw new BadRequestException("El usuario debe pertencer a la categoria del torneo")

    const payment = await this.paymentDetailRepository.findOne({
      where: {
        user: { id: user.id },
        tournament: { id: tournament.id },
        status: 'approved',
      },
      relations: { user: true, tournament: true },
    });
    if (payment)
      throw new BadRequestException(
        'El usuario ya tiene un pago aprobado para este torneo.',
      );
    const body = {
      items: [
        {
          title: tournament.name,
          quantity: 1,
          unit_price: tournament.price,
          description: tournament.description,
          currency_id: 'ARS',
          id: tournament.id,
        },
      ],
      back_urls: {
        success: `${req.host}/${req.tournament}`,
        failure: `${req.host}/${req.tournament}`,
        pending: `${req.host}/${req.tournament}`,
      },
      auto_return: 'approved',
      external_reference: `user:${req.user},tournament:${req.tournament}`,
    };
    const preference = await new Preference(client).create({ body });
    return { redirectUrl: preference.init_point };
  }

  async feedbackPayment(payment: PaymentResponse) {
    
    const externalReference = payment.external_reference;
    const userid = externalReference.split(',')[0].split(':')[1];
    const tournamentid = externalReference.split(',')[1].split(':')[1];

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentid },
    });
    if (!tournament) {
      throw new NotFoundException('No se encontró el torneo');
    }
    const userDB = await this.userRepsoitory.findOne({ where: { id: userid } });
    if (!userDB) {
      throw new NotFoundException('No se encontró al usuario');
    }
    const pay = {
      payment_id: String(payment.id),
      date_approved: payment.date_approved,
      date_created: payment.date_created,
      date_last_updated: payment.date_last_updated,
      status: payment.status,
      transaction_amount: payment.transaction_amount,
      user: userDB,
      tournament,
    };
    const paymentCompleted = await this.paymentDetailRepository.save(pay);
    
    if (paymentCompleted.status === 'approved') {
      await this.paymentDetailRepository.update(paymentCompleted.id, {
        successInscription: true,
      });
      const paymentApproved = await this.paymentDetailRepository.findOne({
        where: { id: paymentCompleted.id }, relations: {user:true, tournament:true}
      });
      const { password, ...cleanUser } = paymentApproved.user;
      const { user, ...paymentClean } = paymentApproved;
      const response = {
        user: cleanUser,
        ...paymentClean,
      };
      return { message: response };
    }
    const { password, ...cleanUser } = paymentCompleted.user;
    const { user, ...paymentClean } = paymentCompleted;
    const response = {
      user: cleanUser,
      ...paymentClean,
    };
    return { message: response };
  }

  getpayment(id: string) {
    const payment = new Payment(client);
    payment
      .get({ id })
      .then((payment) => {
        this.feedbackPayment(payment);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getAllPayments() {
    const payments = await this.paymentDetailRepository.find({
      order: {
        date_created: 'DESC',
      }, relations: { user:true }
    });
    const validPaymentId: PaymentDetail[] = payments.filter((payment) => {
      return payment.id !== null;
    });
    if (!validPaymentId.length)
      throw new NotFoundException(
        'No se encuentran pagos concretados en la BDD',
      );
    return validPaymentId;
  }

  async getPaymentsFromTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({where:{id:tournamentId}})
    if(!tournament)throw new NotFoundException("No se encuentra torneo con el id proporcionado")
    
    const payments = await this.paymentDetailRepository.find({
      where: { tournament: { id: tournamentId } },
    });

    const validPaymentId: PaymentDetail[] = payments.filter((payment) => {
      return payment.id !== null;
    });
    if (!validPaymentId.length)
      throw new NotFoundException(
        'No se encuentran pagos en este torneo',
      );
    return validPaymentId;
  }

  async getPaymentsFromUser(userId: string) {
    const user = await this.userRepsoitory.findOne({where:{id:userId}})
    if(!user)throw new NotFoundException("No se encuentra usuario con el id proporcionado")

    const payments = await this.paymentDetailRepository.find({
      where: { user: { id: userId } },
      relations: { tournament: { team: true }, user: true },
    });

    const validPaymentId: PaymentDetail[] = payments.filter((payment) => {
      return payment.id !== null;
    });

    if (!validPaymentId.length)
      throw new NotFoundException(
        'Este usuario no tiene pagos registrados',
      );

    const cleanPlayments = validPaymentId.map((payment) => {
      const { password, ...cleanUser } = payment.user;
      const { user, ...paymentClean } = payment;
      const response = {
        user: cleanUser,
        ...paymentClean,
      };
      return { message: response };
    });
    return cleanPlayments;
  }

  encryptHeaders(body: any) {
    const parts = body.xSignature.split(',');

    let timestamps: string;
    let encryptedToken: string;
    parts.forEach((part) => {
      const [key, value] = part.split('=');

      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === 'ts') {
          timestamps = trimmedValue;
        } else if (trimmedKey === 'v1') {
          encryptedToken = trimmedValue;
        }
      }
    });
    const secret = process.env.MP_SECRET_KEY;

    const manifest = `id:${body.data.id};request-id:${body.xRequestId};ts:${timestamps};`;

    const hmac = crypto.createHmac('sha256', secret);

    hmac.update(manifest);
    const sha = hmac.digest('hex');
    if (sha !== encryptedToken) {
      throw new ForbiddenException(
        'Por seguridad no es posible completar la transaccion, revise que su proveedor de link sea Mercado Pago',
      );
    }
    return true;
  }
}
