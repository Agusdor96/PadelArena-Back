import { Round } from "../fixture/entities/round.entity";
import { Team } from "../team/entities/team.entity";
import { TournamentEntity } from "../tournament/entities/tournament.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({
    name: "MATCHES"
})
export class Match {
    @PrimaryGeneratedColumn('uuid')
        id: string = uuid()

    @Column({nullable: true})
        date?: string

    @Column({nullable: true})
        time?: string

    @ManyToMany(()=>Team)
    @JoinTable({name: "TEAM_MATCH"})
        teams: Team[]

    @ManyToOne(()=> TournamentEntity, tournament=> tournament.matches)
        tournament: TournamentEntity

    @ManyToOne(() => Team, (team) => team.matchesWon, { nullable: true })
        teamWinner: Team
  
    @ManyToOne(()=> Round, (round)=>round.matches)
        round: Round
}
