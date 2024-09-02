import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Preference } from 'mercadopago';
import { client } from 'src/config/mercadopago';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/paymentDetail.entity';
import { Repository } from 'typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';
// import * as crypto from 'crypto'

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
        success:
          'https://google.com',
        failure:
          'https://youtube.com',
        pending: 
          'https://youtube-music.com'
      },
      auto_return: 'approved',
      external_reference: `${req.user}`,
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

  async feedbackPayment(preference: string, body: any) {
    // const data = body.url.split('?');
    // const dataArray = data[1].split('&');
    // const payment_id = dataArray[2].split('=')[1];
    // const status = dataArray[3].split('=')[1];
    // const external_reference = dataArray[4].split('=')[1];
    // const userid = external_reference.split(',')[0].split(':')[1];
    // const tournamentid = external_reference.split(',')[1].split(':')[1];

    // const payDetail = await this.paymentDetailRepository.findOne({
    //   where: { preferenceId: preference },
    //   relations: {
    //     user: true,
    //     tournament: true,
    //   },
    // });
    // const payIncludesUser = payDetail.user.id === userid;
    // const payIncludesTournament = payDetail.tournament.id === tournamentid;
    // if (payIncludesUser && payIncludesTournament) {
    //   const pay = {
    //     payment_id: payment_id,
    //     date_created: String(new Date()),
    //     status: status,
    //     transaction_amount: payDetail.tournament.price,
    //   };
    //   await this.paymentDetailRepository.update(payDetail.id, pay);
    //   const paymentCompleted = await this.paymentDetailRepository.findOne({
    //     where: { id: payDetail.id },
        relations: { user: true, tournament: true },
    //   });
    //   return { message: paymentCompleted };
    // } else {
    //   throw new BadRequestException(
    //     'El usuario y torneo proporcionados no coinciden con ninguna referencia',
    //   );
    // }
  }

  async getPreferenceByUserId(id: string) {
    const user = await this.userRepsoitory.findOne({ where: { id } });
    const preference = await this.paymentDetailRepository.findOne({
      where: { user: user },
    });
    if (!user) {
      throw new NotFoundException('No fue posible encontrar al usuario');
    }
    if (!preference) {
      throw new NotFoundException(
        'Parece que el usuario no tiene ninguna preferencia ligada',
      );
    }
    return preference;
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
}
//   const parts = paymentDetails.xSignature.split(',')
//   let timestamps: string
//   let encryptedToken: string

//   parts.forEach(part => {
//     const [key, value] = part.split('=');
//     if (key && value) {
//         const trimmedKey = key.trim();
//         const trimmedValue = value.trim();
//         if (trimmedKey === 'ts') {
//           timestamps = trimmedValue;
//         } else if (trimmedKey === 'v1') {
//           encryptedToken = trimmedValue;
//         }
//     }
// });
// const secret = process.env.MP_SECRET_KEY

// const manifest = `id:${id};request-id:${paymentDetails.xRequestId};ts:${timestamps};`

// const hmac = crypto.createHmac('sha256', secret)
// hmac.update(manifest)
// const sha = hmac.digest('hex');

// if(sha !== encryptedToken){
//   throw new ForbiddenException('Por seguridad no es posible completar la transaccion, revise que su proveedor de link sea Mercado Pago')
// }

// /mercado-pago/feedback?collection_id=86466887941&collection_status=approved&payment_id=86466887941&status=approved&external_reference=user:58e4a0f2-0964-4280-b233-29b6db27638b,%20tournament:47ba07cb-4bca-4738-9fb6-7cb2cb8a2cbe&payment_type=account_money&merchant_order_id=22386184588&preference_id=1967937891-46414eef-dc93-4ceb-8fb8-32f0431e0185&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
