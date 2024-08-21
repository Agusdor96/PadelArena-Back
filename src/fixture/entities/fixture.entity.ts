import { match } from "assert";
import { Match } from "src/match/entities/match.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name:"FIXTURES"
})
export class Fixture {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @Column()
    stage: string

    @Column()
    date: Date

    @Column()
    time: Date

    @OneToMany(() => Match, (match) => match.fixture)
    matches: Match[]

    @OneToOne(() => Tournament)
    tournament: Tournament
}
