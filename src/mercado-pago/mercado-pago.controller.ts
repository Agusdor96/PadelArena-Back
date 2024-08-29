import { Controller, Post, Body, Get, ExecutionContext, UseInterceptors } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { PaymentDetailDto } from './dtos/paymentDetail.dto';
import { ApiTags } from '@nestjs/swagger';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { DEMO } from 'src/interceptors/demo.interceptor';

@ApiTags("MERCADO-PAGO")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  apiMPConnection(@Body() req: dataPaymentDto){
    return this.mercadoPagoService.mpConnections(req)
  }

  @UseInterceptors(DEMO)
  @Post('feedback')
  feedbackPayment (@Body() paymentDetails:any){
    return this.mercadoPagoService.feedbackPayment(paymentDetails)
  }
}
