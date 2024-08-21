import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "CATEGORY"
})
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({type: "varchar", length: 50, nullable:false})
    name:string
    
    @Column({type: "text", nullable:false})
    description:string
}
