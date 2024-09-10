import { User } from "../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity({
    name:"MESSAGES"
})
export class Message {
    @PrimaryGeneratedColumn('uuid')
        id: string = uuid()

    @Column()
        content: string

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
        createdAt: Date
        
    @ManyToOne(()=>User, (user)=> user.messages)
        sender: User

}