import { TournamentEntity } from "../tournament/entities/tournament.entity";
import { User } from "../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'PAYMENT-DETAIL'
})
export class PaymentDetail {
    @PrimaryGeneratedColumn('uuid')
        id: string = uuid()

    @Column()
        payment_id: string

    @Column()
        status: string

    @Column()
        date_created: Date

    @Column({nullable: true})
        date_approved?: Date
    
    @Column({nullable: true})
        date_last_updated?: Date

    @Column()
        transaction_amount: number

    @Column({default: false})
        successInscription?: boolean

    @ManyToOne(()=> TournamentEntity)
    @JoinColumn({name: 'PAYMENTS-TOURNAMENT'})
        tournament: TournamentEntity

    @ManyToOne(()=> User)
    @JoinColumn({name: 'PAYMENTS-USER'})
        user: User

}
