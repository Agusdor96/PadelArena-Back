import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateTeamDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name:string;

    @IsNotEmpty()
    @IsString()
    category:string

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    player1:string

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    player2:string
}
