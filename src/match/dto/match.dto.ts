import { IsArray, IsDate, IsNotEmpty, IsOptional, MaxLength, MinLength} from "class-validator"
import { Team } from "src/team/entities/team.entity"

export class MatchDto {

    @IsNotEmpty()
    @IsDate()
    date:string

    @IsNotEmpty()
    time:string

    @IsArray()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(2)
    teams: Team[]

    @IsOptional()
    teamWinner: Team
}
