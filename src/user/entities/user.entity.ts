import { Category } from "src/category/entities/category.entity";
import { PlayerStadistic } from "src/player-stadistics/entities/player-stadistic.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../roles.enum";
import {v4 as uuid} from 'uuid';
import { Message } from "src/global-chat/entities/message.entity";

@Entity({
    name: "USERS"  
})
export class User {
    @PrimaryGeneratedColumn("uuid")
        id:string = uuid()

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

    @Column({ type: "text", nullable: true, default: "https://res.cloudinary.com/ds7jn3ymr/image/upload/v1726010405/userPadel_njifpz.webp"})
        profileImg?: string

    @Column({nullable: true})
        clientId?: string
        
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


    @ManyToOne(()=> Message, message => message.sender)
        messages: Message[]
}