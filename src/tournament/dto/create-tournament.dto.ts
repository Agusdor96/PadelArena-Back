import { IsDate, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

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
    @Min(16)
    teamsQuantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    matchDuration: number;

    @IsNotEmpty()
    @IsNumber()
    courts: number;

    @IsNotEmpty()
    descrption: string;

    @IsNotEmpty()
    tournamentImg: string;

    @IsNotEmpty()
    category: Category;

}
