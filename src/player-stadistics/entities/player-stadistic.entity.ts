import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name:"PLAYER_STADISTICS"
})
export class PlayerStadistic {
    @PrimaryGeneratedColumn("uuid")
        id: string = uuid()

    @Column()
        won: number

    @Column()
        loss: number

}
