import { Category } from "src/category/entities/category.entity";
import { PlayerStadistic } from "src/player-stadistics/entities/player-stadistic.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../roles.enum";

@Entity({
    name: "USERS"  
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type: "varchar", length: 50, nullable:false})
        name:string;

    @Column({type: "varchar", length: 50, nullable:false})
        lastName:string;

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
        email:string;

    @Column({ type: "text", nullable: false })
        password:string

    @Column({type: "bigint"})
        phone:string

    @Column({ type: "varchar", length: 50})
        country:string

    @Column({ type: "varchar", length: 50})
        city:string

    @Column('text')
        address:string

    @Column({ type: "text", nullable: false, default: "default-image-url" })
        profileImg?: string

    @Column({
        type: "enum",
        enum: RoleEnum,
        default:RoleEnum.USER
    })
        role:RoleEnum

    @ManyToOne(()=> Category, (category) => category.users)
        category:Category

    @ManyToMany(()=> Team, team => team.user)
        team: Team[]

    @OneToOne(()=> PlayerStadistic)
    @JoinColumn({name: "player_stadistics"})
        playerStadistic: PlayerStadistic
}