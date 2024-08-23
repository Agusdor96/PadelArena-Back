import { IsArray, IsDate, IsNotEmpty, IsOptional} from "class-validator"
import { Team } from "src/team/entities/team.entity"

export class MatchDto {

    @IsNotEmpty()
    @IsDate()
    date:string

    @IsNotEmpty()
    time:string

    @IsArray()
    @IsNotEmpty()
    teams: Team[]

    @IsOptional()
    teamWinner: Team
}
