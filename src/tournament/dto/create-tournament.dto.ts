import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";


export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
    
    @IsString()
    @IsNotEmpty()
    startTime: string;
    
    @IsString()
    @IsNotEmpty()
    endTime: string;
    
    @IsNotEmpty()
    @IsArray()
    playingDays: string[];

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
    @IsOptional()
    tournamentFlyer: string;

    @IsNotEmpty()
    @IsUUID()
    category: string;
}
