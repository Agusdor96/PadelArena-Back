import { Category } from 'src/category/entities/category.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/team/entities/team.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { InscriptionEnum, StatusEnum } from '../tournament.enum';


 @Entity({
     name: 'TOURNAMENT'
 })
export class TournamentEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string = uuid()

  @Column({type:"varchar", length: 50})
  name:string

  @Column({ type: 'date' })
  startDate:Date

  @Column({ type: 'date' })
  endDate:Date

  @Column()
  startingTime:string

  @Column()
  finishTime:string

  @Column("text", {array: true})
  playingDay:string[]

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.UPCOMING
  })
  status: StatusEnum

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

  @Column({nullable: true })
  matchStartTime: string;

  @Column({default: 0})
  currentDay: number

  @Column("text", { array: true, nullable: true })
  gallery: string[]

  @Column({type: 'text', nullable: false, default: 'https://assets-decimas-2.s3.amazonaws.com/uploads/2023/03/como-aprender-jugar-padel.jpg'})
  tournamentFlyer: string

  @Column()
  courtsAvailable: number

  @ManyToOne(() => Category, (category) => category.tournaments, {nullable:false})
  category: Category

  @OneToMany(() => Team, (team) => team.tournament, {nullable:true})
  team: Team[]

  @OneToMany(() => Match, (match) => match.tournament, {nullable:true})
  matches: Match[]

  @OneToOne(() => Fixture, {nullable:true})
  @JoinColumn({name:"fixture_id"})
  fixture: Fixture

  @Column()
  price: number

  @Column()
  plusCode:string
}