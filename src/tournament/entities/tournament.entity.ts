import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';


 @Entity({
     name: 'tournament'
 })
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id:string
  
  @Column({type:'varchar', lenght: 50})
  name:string

  
  status: string;
   name:string;
}
