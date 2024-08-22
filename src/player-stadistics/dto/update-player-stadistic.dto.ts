import { PartialType } from '@nestjs/swagger';
import { CreatePlayerStadisticDto } from './create-player-stadistic.dto';

export class UpdatePlayerStadisticDto extends PartialType(CreatePlayerStadisticDto) {}
