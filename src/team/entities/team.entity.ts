import { Category } from 'src/category/entities/category.entity';
import { Match } from 'src/match/entities/match.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'TEAM',
})
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ nullable: true })
  order: number;

  @ManyToOne(() => Category, (category) => category.team)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => User, (user) => user.team, { cascade: true })
  @JoinTable({ name: 'TEAM_USERS' })
  user: User[];

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.team)
  tournament: TournamentEntity;

  @OneToMany(() => Match, (match) => match.teamWinner, {nullable:true})
  matchesWon: Match[];

  @Column({default:true})
  ableForPlay: boolean;
}
