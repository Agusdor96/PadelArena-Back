import { Controller, Post, Body, UseInterceptors, Get, Param, ParseUUIDPipe, HttpCode, Query, UseGuards, Put } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { dataPaymentDto } from './dtos/dataPayment.dto';
import { HeaderInterceptor } from 'src/interceptors/demo.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/user/roles.enum';
import { UserIdINterceptor } from 'src/interceptors/userId.interceptor';
import { SwaggerByTournament, SwaggerByUser, SwaggerCreatePreference, SwaggerFeedback, SwaggerGetAllPayments, SwaggerInscriptionStatus } from 'src/decorators/SwaggerDecorators/Mp.decorators';

@ApiTags("MERCADO PAGO")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}
  
  @ApiBearerAuth()
  @Post('create_preference')
  @SwaggerCreatePreference()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserIdINterceptor)
  apiMPConnection(@Body() req: dataPaymentDto){
    return this.mercadoPagoService.mpConnections(req)
  }
  
  @ApiBearerAuth()
  @HttpCode(201)
  @Post('feedback')
  @SwaggerFeedback()
  @UseInterceptors(HeaderInterceptor)
  feedbackPayment (@Query('data.id') id: string, @Body() body : string){
    this.mercadoPagoService.encryptHeaders(body)
    this.mercadoPagoService.getpayment(id)
    return id
  }

  @ApiBearerAuth()
  @Put("/inscriptionStatus/:paymentId")
  @SwaggerInscriptionStatus()
  @UseGuards(AuthGuard)
  updateSuccessInscription(@Param("paymentId") paymentId:string){
    return this.mercadoPagoService.updateSuccessInscription(paymentId)
  }

  @ApiBearerAuth()
  @Get('allPayments')
  @SwaggerGetAllPayments()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  getAllPayments(){
    return this.mercadoPagoService.getAllPayments()
  }

  @ApiBearerAuth()
  @Get("byTournament/:tournamentId")
  @SwaggerByTournament()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  allTournamentPayments(@Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromTournament(tournamentId)
    } catch(err){
      throw err
    }
  }
  @ApiBearerAuth() 
  @Get("byUser/:userId")
  @SwaggerByUser()
  @UseGuards(AuthGuard)
  allUserPayments(@Param("userId", ParseUUIDPipe) userId:string){
    try{
      return this.mercadoPagoService.getPaymentsFromUser(userId)
    } catch(err){
      return err
    }
  }
}
