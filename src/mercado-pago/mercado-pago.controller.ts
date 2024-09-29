import { Controller, Post, Body, Get, Param, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { ApiTags } from '@nestjs/swagger';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { CustomCreatePreference, CustomFeedBack, CustomGetPayments, CustomInscriptionStatus, CustomTournamentPayments, CustomUserPayments } from 'src/decorators/controllerDecorators/MPController.decorator';

@ApiTags("MERCADO PAGO")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}
  
  @Post('create_preference')
  @CustomCreatePreference()
  apiMPConnection(@Body() req: dataPaymentDto){
    return this.mercadoPagoService.mpConnections(req)
  }
  
  @Post('feedback')
  @CustomFeedBack()
  feedbackPayment (@Query('data.id') id: string, @Body() body : string){
    this.mercadoPagoService.encryptHeaders(body)
    this.mercadoPagoService.getpayment(id)
    return id
  }

  @Put("/inscriptionStatus/:paymentId")
  @CustomInscriptionStatus()
  updateSuccessInscription(@Param("paymentId") paymentId:string){
    return this.mercadoPagoService.updateSuccessInscription(paymentId)
  }

  @Get('allPayments')
  @CustomGetPayments()
  getAllPayments(){
    return this.mercadoPagoService.getAllPayments()
  }

  @Get("byTournament/:tournamentId")
  @CustomTournamentPayments()
  allTournamentPayments(@Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromTournament(tournamentId)
    } catch(err){
      throw err
    }
  }

  @Get("byUser/:userId")
  @CustomUserPayments()
  allUserPayments(@Param("userId", ParseUUIDPipe) userId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromUser(userId)
    } catch(err){
      return err
    }
  }
}
