import { TournamentEntity } from "src/tournament/entities/tournament.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'PAYMENT-DETAIL'
})
export class PaymentDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    preferenceId: string

    @Column()
    external_reference: string

    @Column({nullable:true})
    payment_id?: string

    @Column({nullable:true})
    status?: string

    @Column({nullable:true})
    date_created?: string

    @Column({nullable:true})
    date_last_update?: string

    @Column({nullable:true})
    transaction_amount?: number

    @Column({nullable:true})
    payment_method_id?: string

    @Column({nullable:true})
    payment_type_id?:string

    @ManyToOne(()=> TournamentEntity)
    @JoinColumn({name: 'PAYMENTS-TOURNAMENT'})
    tournament: TournamentEntity

    @ManyToOne(()=> User)
    @JoinColumn({name: 'PAYMENTS-USER'})
    user: User

}
