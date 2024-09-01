import { Controller, Post, Body, UseInterceptors, Get, Param, ParseUUIDPipe, HttpCode, Query, NotFoundException, Redirect, } from '@nestjs/common';
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
  @Get('feedback')@Redirect('https://google.com')
  
  feedbackPayment (@Query('preference_id') preference: string, @Body() url : string){
    try {
      return this.mercadoPagoService.feedbackPayment(preference, url)
      
    } catch (error) {
      throw new NotFoundException('No fue posible encontrar al payment')
    }

  }

  @Get('preference/:id')
  getPreferencebyUserId(@Param('id', ParseUUIDPipe) id:string ){
    return this.mercadoPagoService.getPreferenceByUserId(id)
  }

  @Get(":tournamentId")
  allTournamentPayments(@Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    try{
      this.mercadoPagoService.getPaymentsFromTournament(tournamentId)
    } catch(err){
      return err
    }
  }
  @Get(":userId")
  allUserPayments(@Param("userId", ParseUUIDPipe) userId:string){
    try{
      this.mercadoPagoService.getPaymentsFromUser(userId)
    } catch(err){
      return err
    }
  }
}
