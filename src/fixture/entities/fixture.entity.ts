import { TournamentEntity } from "../tournament/entities/tournament.entity";
import {  Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Round } from "./round.entity";

@Entity({
    name:"FIXTURES"
})
export class Fixture {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();

    @OneToOne(() => TournamentEntity)
    tournament: TournamentEntity

    @OneToMany(() => Round, (round) => round.fixture)
    round: Round[]
}

