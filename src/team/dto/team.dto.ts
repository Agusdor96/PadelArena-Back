import { IsArray, IsDefined, IsString, Length, MaxLength, MinLength } from "class-validator";

export class TeamDto {
    
    @IsString()
    @IsDefined()
    @Length(3, 20)
    name: string;

    @IsArray()
    @IsDefined()
    players: string[]

}
