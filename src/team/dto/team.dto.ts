import { IsArray, IsDefined, IsString, Length, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class TeamDto {
    
    @IsString()
    @IsDefined()
    @Length(3, 20)
    name: string;

    @IsArray()
    @IsDefined()
    @MaxLength(2)
    @MinLength(2)
    players: User[]

}
