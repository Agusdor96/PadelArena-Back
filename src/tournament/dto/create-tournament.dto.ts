import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Min } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    
    @IsString()
    @IsNotEmpty()
    startTime: string;
    
    @IsString()
    @IsNotEmpty()
    endTime: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(1,7)
    playingDays: string[];
    
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(16)
    teamsQuantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    matchDuration: number;

    @IsNotEmpty()
    @IsNumber()
    courts: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    tournamentFlyer: string;

    @IsNotEmpty()
    @IsUUID()
    category: string;
}
