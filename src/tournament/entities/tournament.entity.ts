import { Matches } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Team } from 'src/team/entities/team.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';


 @Entity({
     name: 'tournament'
 })
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id:string
  
  @Column({type:'varchar', lenght: 50})
  name:string

  @Column()
  startDate:Date

  @Column()
  endDate:Date
  
  @Column()
  startingTime:Date

  @Column()
  finishTime:Date

  @Column()
  playingDay:Date

  @Column()
  status: boolean

  @Column()
  imgUrl:string[]

  @Column()
  courtsAvailable: number

  @ManyToOne(() => Category, (category) => category.tournaments)
  category: Partial<Category>

  @OneToMany(() => Team, (team) => team.tournament)
  team: Team[]

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[]

  @OneToOne(() => Fixture)
  fixture: Fixture

}
