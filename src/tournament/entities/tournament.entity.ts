import { Category } from 'src/category/entities/category.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/team/entities/team.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { InscriptionEnum } from '../inscription.enum';


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

  @Column({
    type: "enum",
    enum: InscriptionEnum,
    default: InscriptionEnum.OPEN,
  })
    inscription: InscriptionEnum

  @Column()
  teamsQuantity: number

  @Column()
  matchDuration: number

  @Column()
  description: string

  @Column("text", { array: true, nullable: true })
  imgUrl: string[]
  
  @Column({ type: "text", nullable: false, default: "default-image-url" })
  tournamentFlyer: string

  @Column()
  courtsAvailable: number

  @ManyToOne(() => Category, (category) => category.tournaments, {nullable:false})
  category: Partial<Category>

  @OneToMany(() => Team, (team) => team.tournament, {nullable:true})
  team: Team[]

  @OneToMany(() => Match, (match) => match.tournament, {nullable:true})
  matches: Match[]

  @OneToOne(() => Fixture, {nullable:true})
  fixture: Fixture
}
