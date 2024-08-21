import { IsDate, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateTournamentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(16)
    qEquipos: number;

    
    @IsNotEmpty()
    @IsNumber()
    duracionPartidos: number;

    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;
    
    @IsDate()
    @IsNotEmpty()
    horaComienzo: Date;

    @IsDate()
    @IsNotEmpty()
    horaFin: Date;

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

    

    //relacion con categoria 
    // realcion con teams 
    //realacion con matches
}
