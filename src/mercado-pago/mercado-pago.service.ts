import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Preference } from 'mercadopago';
import { client } from 'src/config/mercadopago';

@Injectable()
export class MercadoPagoService {
  async mpConnections(req: any) {
    
    const body = {
      items: [
        {
          title: req.title,
          quantity: Number(req.quantity),
          unit_price: Number(req.price),
          currency_id: 'ARS',
          id: '',
        },
      ],
      back_urls: {
        success: 'https://padelarena.vercel.app/',
        failure: 'https://padelarena.vercel.app/tournaments',
        pending: 'https://padelarena.vercel.app/login'
      },
      auto_return: "approved"
    };
    const preference = await new Preference(client).create({ body })
    
    return {redirectUrl: preference.init_point}
  }

  
}
