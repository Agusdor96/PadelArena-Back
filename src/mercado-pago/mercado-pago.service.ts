import { Injectable } from '@nestjs/common';
import { Preference } from 'mercadopago';
import { client } from 'src/config/mercadopago';
import { dataPaymentDto } from './dtos/dataPayment.dto';

@Injectable()
export class MercadoPagoService {
  async mpConnections(req: dataPaymentDto) {
    
    const body = {
      items: [
        {
          title: req.title,
          quantity: Number(req.quantity),
          unit_price: Number(req.unit_price),
          currency_id: 'ARS',
          id: ''
        },
      ],
      back_urls: {
        success: req.successUrl,
        failure: req.failureUrl,
        pending: req.pendingUrl
        //  
      },
      auto_return: "approved"
    };
    const preference = await new Preference(client).create({ body })
    const prefId = preference.id
    
    return {redirectUrl: preference.init_point}
  }

  
}
