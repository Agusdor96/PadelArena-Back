import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name:"FIXTURES"
})
export class Fixture {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid();
}
