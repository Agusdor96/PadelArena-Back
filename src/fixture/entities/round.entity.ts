import { match } from "assert";
import { Match } from "src/match/entities/match.entity";
import { Team } from "src/team/entities/team.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Fixture } from "./fixture.entity";

@Entity({
    name:"ROUND"
})
export class Round {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column()
    stage: string

    @Column()
    matches: Match[]
    

    @Column()
    winners: Team[]

    @ManyToOne(() => Fixture, (fixture) => fixture.round)
    fixture: Fixture
}
