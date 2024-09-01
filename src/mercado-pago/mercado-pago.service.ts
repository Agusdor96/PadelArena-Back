import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if(!tournament){
      throw new NotFoundException('No se encontró el torneo')
    }
    const user = await this.userRepsoitory.findOne({ where: { id: req.user } });
    if(!user) {
      throw new NotFoundException('No se encontró al usuario')
    }
    const body = {
      items: [
        {
          title: tournament.name,
          quantity: 1,
          unit_price: tournament.price,
          description: tournament.description,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        //CAMBIAR A LINK DE DEPLOY CABEZAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        success:
          'https://q52vfbj3-3000.brs.devtunnels.ms/mercado-pago/feedback',
        failure: 'https://q52vfbj3-3000.brs.devtunnels.ms/mercado-pago/feedback',
      },
      auto_return: 'approved',
      external_reference: `user:${req.user}, tournament:${req.tournament}`,
      binary_mode: true
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
    const data = body.url.split('?');
    const dataArray = data[1].split('&');
    const payment_id = dataArray[2].split('=')[1];
    const status = dataArray[3].split('=')[1];
    const external_reference = dataArray[4].split('=')[1];
    const userid = external_reference.split(',')[0].split(':')[1];
    const tournamentid = external_reference.split(',')[1].split(':')[1];

    const payDetail = await this.paymentDetailRepository.findOne({
      where: { preferenceId: preference },
      relations: {
        user: true,
        tournament: true,
      },
    });
    const payIncludesUser = payDetail.user.id === userid;
    const payIncludesTournament = payDetail.tournament.id === tournamentid;
    if (payIncludesUser && payIncludesTournament) {
      const pay = {
        payment_id: payment_id,
        date_created: String(new Date()),
        status: status,
        transaction_amount: payDetail.tournament.price,
      };
      await this.paymentDetailRepository.update(
        payDetail.id,
        pay,
      );
      
      return { message: payDetail };
    }
    else{
      throw new BadRequestException('El usuario y torneo proporcionados no coinciden con ninguna referencia')
    }
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

