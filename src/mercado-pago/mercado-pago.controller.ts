import { Controller, Post, Body, UseInterceptors, Get, Param, ParseUUIDPipe, HttpCode, Query, } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { ApiTags } from '@nestjs/swagger';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { HeaderInterceptor } from 'src/interceptors/demo.interceptor';

@ApiTags("MERCADO-PAGO")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  apiMPConnection(@Body() req: dataPaymentDto){
    return this.mercadoPagoService.mpConnections(req)
  }

  @HttpCode(200)
  @UseInterceptors(HeaderInterceptor)
  @Post('feedback/notification')
  feedbackPayment (@Body() paymentDetails:any, @Query('data.id') id?:string){
    return this.mercadoPagoService.feedbackPayment(paymentDetails, id)
  }

  @Get('preference/:id')
  getPreferencebyUserId(@Param('id', ParseUUIDPipe) id:string ){
    return this.mercadoPagoService.getPreferenceByUserId(id)
  }
}
