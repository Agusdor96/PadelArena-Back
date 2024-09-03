import { Controller, Post, Body, UseInterceptors, Get, Param, ParseUUIDPipe, HttpCode, Query } from '@nestjs/common';
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

  @HttpCode(201)
  @UseInterceptors(HeaderInterceptor)
  @Post('feedback')
  feedbackPayment (@Query('data.id') id: string, @Body() body : string){
    this.mercadoPagoService.encryptHeaders(body)
    this.mercadoPagoService.getpayment(id)
    return id
  }

  @Get('allPayments')
  getAllPayments(){
    return this.mercadoPagoService.getPreferenceByUserId()
  }

  @Get("byTournament/:tournamentId")
  allTournamentPayments(@Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromTournament(tournamentId)
    } catch(err){
      throw err
    }
  }
  @Get("byUser/:userId")
  allUserPayments(@Param("userId", ParseUUIDPipe) userId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromUser(userId)
    } catch(err){
      return err
    }
  }
}
