import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name:"PLAYER_STADISTICS"
})
export class PlayerStadistic {
    @PrimaryGeneratedColumn("uuid")
        id: string = uuid()

    @Column({default: 0})
        won?: number

    @Column({default: 0})
        loss?: number

    @Column({default:0})
        wonTournaments?:number
        
    @Column({default:0})
        lossTournaments?:number
}
