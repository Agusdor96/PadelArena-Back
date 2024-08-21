import { Category } from "src/category/entities/category.entity";
import { Match } from "src/match/entities/match.entity";
import { Tournament } from "src/tournament/entities/tournament.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({
    name: "TEAM"
})
export class Team {
    @PrimaryGeneratedColumn("uuid")
        id:string = uuid()

    @Column({type: "varchar", length: 50, nullable:false})
        name: string
    
    @ManyToOne(() => Category, (category)=>category.team)
        category: Category

    @ManyToMany(()=> User, (user) => user.team)
    @JoinTable({name: "TEAM_USERS"})
        user: User[]

    @ManyToOne(() => Tournament, (tournament) => tournament.team)
        tournament:Tournament
    
    @ManyToMany(()=> Match, (match)=> match.teams)
    @JoinTable({name: "TEAM_MATCH"})
        match: Match
}
