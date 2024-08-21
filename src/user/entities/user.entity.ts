import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}