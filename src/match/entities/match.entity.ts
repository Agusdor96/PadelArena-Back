import { Round } from "src/fixture/entities/round.entity";
import { Team } from "src/team/entities/team.entity";
import { TournamentEntity } from "src/tournament/entities/tournament.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({
    name: "MATCHES"
})
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    date: string

    @Column()
    time: string

    @ManyToMany(()=>Team)
    @JoinTable({name: "TEAM_MATCH"})
    teams: Team[]

    @ManyToOne(()=> TournamentEntity, tournament=> tournament.matches)
    tournament: TournamentEntity

    @Column({nullable:true})
    teamWinner?: string

    @ManyToOne(()=> Round, (round)=>round.matches)
    round: Round
}
