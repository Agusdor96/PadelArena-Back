import { Match } from "src/match/entities/match.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(()=> Match)
    matches: Match[]
    
    @Column('text', {array: true, nullable: true})
    winners?: string[]

    @ManyToOne(() => Fixture, (fixture) => fixture.round)
    fixture: Fixture
}
