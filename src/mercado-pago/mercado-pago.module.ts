import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetail } from './entities/paymentDetail.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Team } from 'src/team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetail, TournamentEntity, Team])],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadoPagoModule {}
