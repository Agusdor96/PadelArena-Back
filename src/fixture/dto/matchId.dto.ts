import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class MatchIdDTO {

    @ApiProperty({ description: 'id del partido que se quiere seleccionar', example: '5a12b04d-c0e9-4b00-9618-9160fea92864' })
    @IsNotEmpty()
    @IsUUID()
    matchId: string
    
}