import { IsNotEmpty } from "class-validator";
import { Round } from "../entities/round.entity";

export class CreateFixtureDto {

    @IsNotEmpty()
    round: Round
    
}
