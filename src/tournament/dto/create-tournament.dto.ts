import { IsDate, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(16)
    teamsQuantity: number;

    
    @IsNotEmpty()
    @IsNumber()
    matchDuration: number;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    
    @IsDate()
    @IsNotEmpty()
    startTime: Date;

    @IsDate()
    @IsNotEmpty()
    endTime: Date;

    @IsNotEmpty()
    @IsString()
    @Length(1,7)
    playingDays: string[];

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    courts: number;
}
