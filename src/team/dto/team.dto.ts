import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsString, Length } from "class-validator";

export class TeamDto {
    @ApiProperty({ description: 'Nombre con el que se quiera identificar el equipo', example: 'Los saca chispa' })
    @IsString()
    @IsDefined()
    @Length(3, 20)
        name: string;

    @ApiProperty({ description: 'Ids de los 2 jugadores que se quieran inscribir al torneo. Deben ser ambos de la misma categoria', example: '["e075ea11-6bc2-49cb-8f91-f06fcd73ee36","33d4ff83-4f77-4be9-b51f-f6d3e53dc60b"]' })
    @IsArray()
    @IsDefined()
        players: string[]

}
