import { IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator"
import { Team } from "src/team/entities/team.entity"

export class CreateMatchDto {

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
