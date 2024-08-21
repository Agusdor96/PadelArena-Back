import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "TEAM"
})

export class Team {
    @PrimaryGeneratedColumn("uuid")
        id:string;

    @Column({type: "varchar", length: 50, nullable:false})
        name: string
    
    @ManyToOne(() => Category, (category)=>category.team)
        category: Category

    @ManyToMany(()=> User, (user) => user.team)
    @JoinTable({name: "TEAM_USERS"})
        user: User[]

    @ManyToOne(() => Tournament, (tournament) => tournament.team)
        tournament:Tournament;
}
