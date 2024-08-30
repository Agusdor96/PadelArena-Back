import { Injectable, NotFoundException } from '@nestjs/common';
import { Preference} from 'mercadopago';
import { client } from 'src/config/mercadopago';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/paymentDetail.entity';
import { Repository } from 'typeorm';
import { PaymentDetailDto } from './dtos/paymentDetail.dto';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MercadoPagoService {
  
  
  constructor(
    @InjectRepository(PaymentDetail)
    private paymentDetailRepository: Repository<PaymentDetail>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(User)
    private userRepsoitory: Repository<User>

  ){}
  async mpConnections(req: dataPaymentDto) {
    const tournament = await this.tournamentRepository.findOne({where: {id: req.tournament}})
    const user = await this.userRepsoitory.findOne({where: { id: req.user}})
    const body = {
      items: [
        {
          title: tournament.name,
          quantity: 1,
          unit_price: tournament.price,
          description: tournament.description,
          currency_id: 'ARS',
          id: ''
        },
      ],
      back_urls: {
        success: `${req.host}/${req.tournament}`,
        failure: `${req.host}/${req.tournament}`,
        pending: `${req.host}/${req.tournament}`
      },
      auto_return: "approved",
      };
    const preference = await new Preference(client).create({ body })

    const prefId = {
      preferenceId: preference.id,
      tournament: tournament,
      user: user
    }

    await this.paymentDetailRepository.save(prefId)
    return {redirectUrl: preference.init_point}
  }

  async feedbackPayment(paymentDetails: any) {
    // const payDetail = await this.paymentDetailRepository.findOne({where: {preferenceId: paymentDetails.preference_id}})
    // const team = await this.teamRepsoitory.findOne({where: {id: paymentDetails.team}})
    // const pay = {
    //   ...payDetail,
    //   payment_id: paymentDetails.payment,
    //   external_reference: paymentDetails.external_reference,
    //   marchant_order_id: paymentDetails.marchant_order_id,
    //   team: team
    // }

    // const paymentDetailComplete = await this.paymentDetailRepository.save(pay)
    // return {
    //   message: 'Registro de pago ralizado con exito', 
    //   Payment: paymentDetailComplete.payment_id,
    //   Status: paymentDetailComplete.status,
    //   MarchantOrder: paymentDetailComplete.marchant_order_id
    // }
    return paymentDetails
  }

  async getPreferenceByUserId(id: string) {
    const user = await this.userRepsoitory.findOne({where: {id}})
    const preference  =await this.paymentDetailRepository.findOne({where: {user: user }})
    if(!user){
      throw new NotFoundException('No fue posible encontrar al usuario')
    }
    if(!preference){
      throw new NotFoundException('Parece que el usuario no tiene ninguna preferencia ligada')
    }
    return preference
  }
}
