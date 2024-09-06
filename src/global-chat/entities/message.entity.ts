import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column()
    content: string

    @ManyToOne(()=>User, (user)=> user.messages)
    sender: User

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date
}