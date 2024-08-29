import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";


export class CreateTournamentDto {
    @ApiProperty({ description: 'Nombre que se le quiera dar al torneo', example: 'Torneo de Verano' })
    @IsNotEmpty()
    @IsString()
        name: string;
    
    @ApiProperty({ description: 'Fecha de inicio del torneo', example: '2024-12-24' })
    @IsDateString()
    @IsNotEmpty()
        startDate: Date;

    @ApiProperty({ description: 'Horario de apertura del club donde se desarrollara el torneo', example: '09:00' })
    @IsString()
    @IsNotEmpty()
        startTime: string;

    @ApiProperty({ description: 'Horario de apertura del club donde se desarrollara el torneo', example: '17:00' })
    @IsString()
    @IsNotEmpty()
        endTime: string;

    @ApiProperty({ description: 'Dias en los que se desarrollara el torneo', example: ' ["Lunes", "Miércoles", "Viernes"]' })
    @IsNotEmpty()
    @IsArray()
        playingDays: string[];

    @ApiProperty({ description: 'Cantidad de equipos que participan en el torneo', example: '16' })
    @IsNotEmpty()
    @IsNumber()
    @Min(16)
        teamsQuantity: number;

    @ApiProperty({ description: 'La duracion de juego de los partidoa que se quiera establecer en minutos', example: '60' })
    @IsNotEmpty()
    @IsNumber()
        matchDuration: number;

    @ApiProperty({ description: 'Cantidad de canchas disponibles para el torneo', example: '4' })
    @IsNotEmpty()
    @IsNumber()
        courts: number;

    @ApiProperty({ description: 'Descripcion del torneo', example: 'El torneo de verano más esperado con un premio de 5000€. ¡Prepárate para la competición!' })
    @IsNotEmpty()
        description: string;

    @ApiProperty({ description: 'Alguna imagen de portada', example: '/images/default-image.jpg' })
    @IsNotEmpty()
    @IsOptional()
        tournamentFlyer: string;

    @ApiProperty({ description: 'El id de alguna de las 5 categorias de padel amateur definidas ', example: 'Cuarta' })
    @IsNotEmpty()
    @IsUUID()
        category: string;
}
