import { Team } from "src/team/entities/team.entity";
import { TournamentEntity } from "src/tournament/entities/tournament.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: 'PAYMENT-DETAIL'
})
export class PaymentDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    preferenceId: string = uuid()

    @Column({nullable:true})
    payment_id?: string

    @Column({nullable:true})
    status?: string

    @Column({nullable:true})
    external_reference?: string

    @Column({nullable:true})
    marchant_order_id?: string

    @ManyToOne(()=> TournamentEntity)
    @JoinColumn({name: 'PAYMENTS-TOURNAMENT'})
    tournament: TournamentEntity

    @OneToOne(()=> Team)
    team: Team

}
