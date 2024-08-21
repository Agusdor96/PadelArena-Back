import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({
    name: "CATEGORY"
})
export class Category {
    @PrimaryGeneratedColumn("uuid")
        id:string = uuid()

    @Column({type: "varchar", length: 50, nullable:false})
        name:string
    
    @Column({type: "text", nullable:false})
        description:string

    @OneToMany(() => Team, (team) => team.category)
        team: Team

    @OneToMany(() => Tournament, (tournaments)=> tournaments.category)
        tournaments: Tournament
}
