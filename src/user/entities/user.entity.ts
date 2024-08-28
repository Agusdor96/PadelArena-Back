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

    @Column({ type: "text", nullable: true })
        password:string

    @Column({type: "bigint", nullable: true})
        phone:string

    @Column({ type: "varchar", length: 50, nullable: true})
        country:string

    @Column({ type: "varchar", length: 50, nullable: true})
        city:string

    @Column('text', {nullable: true})
        address:string

    @Column({ type: "text", nullable: true, default: "default-image-url" })
        profileImg?: string

    @Column({
        type: "enum",
        enum: RoleEnum,
        default:RoleEnum.USER
    })
        role:RoleEnum

    @ManyToOne(()=> Category, (category) => category.users, {nullable: true})
        category:Category

    @ManyToMany(()=> Team, team => team.user, {nullable: true})
        team: Team[]

    @OneToOne(()=> PlayerStadistic, {nullable: true})
    @JoinColumn({name: "player_stadistics"})
        playerStadistic: PlayerStadistic
}