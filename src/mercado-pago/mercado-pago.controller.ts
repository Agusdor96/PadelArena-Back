import { Controller, Post, Body, Get } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { PaymentDetailDto } from './dtos/paymentDetail.dto';


@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  apiMPConnection(@Body() req: any){
    return this.mercadoPagoService.mpConnections(req)
  }

  @Get('feedback')
  feedbackPayment (@Body() paymentDetails:PaymentDetailDto){
    return this.mercadoPagoService.feedbackPayment(paymentDetails)
  }
}
