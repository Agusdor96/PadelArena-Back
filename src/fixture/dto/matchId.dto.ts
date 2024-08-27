import { IsNotEmpty, IsUUID } from "class-validator";

export class matchIdDTO {

    @IsNotEmpty()
    @IsUUID()
    matchId: string
    
}