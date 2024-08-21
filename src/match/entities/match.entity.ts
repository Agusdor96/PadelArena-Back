import { Fixture } from "src/fixture/entities/fixture.entity";
import { Team } from "src/team/entities/team.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(()=>Team, team=> team.match)
    teams: Team[]

    @ManyToOne(()=> Tournament, tournament=> tournament.matches)
    tournament: Tournament

    @ManyToOne(() => Fixture, fixture => fixture.matches)
    fixture: Fixture

    @Column()
    teamWinner: string
}
