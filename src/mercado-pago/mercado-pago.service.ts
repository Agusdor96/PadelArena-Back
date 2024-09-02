import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';
import { Payment, Preference } from 'mercadopago';
import { client } from 'src/config/mercadopago';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/paymentDetail.entity';
import { Repository } from 'typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';
import * as crypto from 'crypto';
import { PaymentDetailDto } from './dtos/paymentDetail.dto';

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
    });
    if (!tournament) {
      throw new NotFoundException('No se encontró el torneo');
    }
    const user = await this.userRepsoitory.findOne({ where: { id: req.user } });
    if (!user) {
      throw new NotFoundException('No se encontró al usuario');
    }
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
        success: 'https://google.com',
        failure: 'https://youtube.com',
        pending: 'https://youtube-music.com',
      },
      auto_return: 'approved',
      external_reference: `user:${req.user},tournament:${req.tournament}`,
    };
    const preference = await new Preference(client).create({ body });
    const prefId = {
      preferenceId: preference.id,
      tournament: tournament,
      user: user,
      external_reference: preference.external_reference,
    };
    await this.paymentDetailRepository.save(prefId);
    return { redirectUrl: preference.init_point };
  }

  async feedbackPayment(payment: PaymentResponse) {
    const externalReference = payment.external_reference;
    const userid = externalReference.split(',')[0].split(':')[1];
    const tournamentid = externalReference.split(',')[1].split(':')[1];
    const payDetail = await this.paymentDetailRepository.findOne({
      where: {
        external_reference: externalReference
      },
      relations: {
        user: true,
        tournament: true,
      },
    });
    if (!payDetail) throw new NotFoundException('No fue posible encontrar la preferencia correspondiente al pago a ejecutarse')
    const payIncludesUser = payDetail.user.id === userid;
    const payIncludesTournament = payDetail.tournament.id === tournamentid;
    if (payIncludesUser && payIncludesTournament) {
      const pay: PaymentDetailDto = {
        payment_id: String(payment.id),
        date_approved: payment.date_approved,
        date_created: payment.date_created,
        date_last_updated: payment.date_last_updated,
        status: payment.status,
        transaction_amount: payment.transaction_amount
      };
      await this.paymentDetailRepository.update(payDetail.id, pay);
      const paymentCompleted = await this.paymentDetailRepository.findOne({
        where: { id: payDetail.id },
    relations: { user: true, tournament: true },
      });
      return { message: paymentCompleted };
    } else {
      throw new BadRequestException(
        'El usuario y torneo proporcionados no coinciden con ninguna referencia',
      );
    }
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

  async getPreferenceByUserId() {
    const payments = await this.paymentDetailRepository.find({
      order: {
        date_created: 'DESC'
      }
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
    const payments = await this.paymentDetailRepository.find({
      where: { tournament: { id: tournamentId } },
    });

    if (!payments.length)
      throw new NotFoundException('No se encuentran pagos en este torneo');

    const validPaymentId: PaymentDetail[] = payments.filter((payment) => {
      return payment.id !== null;
    });
    if (!validPaymentId.length)
      throw new NotFoundException(
        'No se encuentran pagos concretados en la BDD',
      );
    return validPaymentId;
  }

  async getPaymentsFromUser(userId: string) {
    const allPayments: PaymentDetail[] = await this.paymentDetailRepository
      .createQueryBuilder('paymentDetail')
      .leftJoinAndSelect('paymentDetail.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    if (!allPayments.length)
      throw new NotFoundException('No se encuentran pagos en este torneo');

    const validPaymentId: PaymentDetail[] = allPayments.filter((payment) => {
      return payment.id !== null;
    });

    if (!validPaymentId.length)
      throw new NotFoundException(
        'No se encuentran pagos concretados en la BDD',
      );
    return validPaymentId;
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
  }
}
