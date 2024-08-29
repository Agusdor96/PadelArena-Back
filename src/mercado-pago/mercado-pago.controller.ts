import { Controller, Post, Body, Get, ExecutionContext } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { PaymentDetailDto } from './dtos/paymentDetail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("MERCADO-PAGO")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  apiMPConnection(@Body() req: any){
    return this.mercadoPagoService.mpConnections(req)
  }

  @Get('feedback')
  feedbackPayment (@Body() paymentDetails:any, req: ExecutionContext){
    console.log(req.switchToHttp().getRequest());
    
    return this.mercadoPagoService.feedbackPayment(paymentDetails)
  }
}
