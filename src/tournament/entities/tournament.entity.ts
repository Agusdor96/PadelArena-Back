import { Category } from 'src/category/entities/category.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/team/entities/team.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';


 @Entity({
     name: 'TOURNAMENT'
 })
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id:string = uuid()
  
  @Column({type:"varchar", length: 50})
  name:string

  @Column()
  startDate:Date

  @Column()
  endDate:Date
  
  @Column()
  startingTime:Date

  @Column()
  finishTime:Date

  @Column("text", {array: true})
  playingDay:string[]

  @Column()
  status: boolean

  @Column("text", { array: true })
    imgUrl: string[]

  @Column()
  courtsAvailable: number

  @ManyToOne(() => Category, (category) => category.tournaments, {nullable:true})
  category: Partial<Category>

  @OneToMany(() => Team, (team) => team.tournament, {nullable:true})
  team: Team[]

  @OneToMany(() => Match, (match) => match.tournament, {nullable:true})
  matches: Match[]

  @OneToOne(() => Fixture, {nullable:true})
  fixture: Fixture

}
