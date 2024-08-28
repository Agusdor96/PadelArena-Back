import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { Request } from 'express';


@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  apiMPConnection(@Body() req: any){
    return this.mercadoPagoService.mpConnections(req)
  }

}
