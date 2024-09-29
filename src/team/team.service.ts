import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { In, Repository } from 'typeorm';
import { TournamentService } from '../tournament/tournament.service';
import { User } from '../user/entities/user.entity';
import * as data from '../seed/team.json';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { StatusEnum } from '../enums/tournament.enum';
import { validate as uuidValidate } from 'uuid';
import { PaymentDetail } from '../mercado-pago/entities/paymentDetail.entity';
import { sender } from '../utils/inscriptionMail';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private tournamentService: TournamentService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(PaymentDetail)
    private paymentRepository: Repository<PaymentDetail>,
  ) {}
  async teamInscription(tournamentId: string, TeamDto: TeamDto) {
    const [newPlayer1, newPlayer2] = TeamDto.players;
    if (!uuidValidate(newPlayer1) || !uuidValidate(newPlayer2))
      throw new BadRequestException(
        'Debes proporcionar id de tipo UUID correctos',
      );

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: { category: true, team: { user: true } },
    });
    
    if (!tournament)
      throw new NotFoundException(
        'No se encuentra torneo con el id proporcionado',
      );
    
    if(tournament.team.length >= tournament.teamsQuantity) throw new BadRequestException("Las inscripciones de este torneo estan completas")

    const players = await this.userRepository.find({
      where: { id: In(TeamDto.players) },
      relations: { category: true },
    });
    if (players.length < 2)
      throw new BadRequestException(
        'Jugadores no encontrados con los ids proporcionados',
      );

    const [player1, player2] = players;

    const paymentPlayer1 = await this.paymentRepository.findOne({
      where: {
        tournament: {id: tournament.id},
        user: {id: player1.id },
        status: 'approved',
      }, relations: {tournament: true, user: true}
    });
    
    if (!paymentPlayer1) {
      const paymentPlayer2 = await this.paymentRepository.findOne({
        where: {
          tournament: {id: tournament.id},
          user: {id: player2.id },
          status: 'approved',
        }, relations: {tournament: true, user: true}
      });
      if(!paymentPlayer2) {
        throw new BadRequestException(
        'Debe pagar antes de poder registrar el equipo',
        );
      }
    }
      
    if (player1.category.id !== player2.category.id)
      throw new BadRequestException(
        'La categoria de los jugadores debe ser la misma para poder inscribirse al torneo',
      );

    if (tournament.category.id !== player1.category.id)
      throw new BadRequestException(
        'No se puede inscribir un equipo a un torneo que no es de la misma categoria',
      );

    if (
      tournament.inscription === 'cerradas' ||
      tournament.status === StatusEnum.FINISHED ||
      tournament.status === StatusEnum.INPROGRESS
    ) {
      throw new BadRequestException(
        'Ya no se pueden inscribir equipos a este torneo',
      );
    }

    for (const team of tournament.team) {
      if (team.name == TeamDto.name)
        throw new BadRequestException('El equipo ya existe con ese nombre');
      const [player1, player2] = team.user;

      const samePlayers =
        player1.id === newPlayer1 ||
        player1.id === newPlayer2 ||
        player2.id === newPlayer1 ||
        player2.id === newPlayer2;
      if (samePlayers) {
        throw new BadRequestException(
          'Uno o ambos jugadores ya están inscritos en este torneo con un equipo diferente',
        );
      }
    }

    const onGoingTournaments = await this.tournamentRepository.find({
      where: { status: StatusEnum.UPCOMING || StatusEnum.INPROGRESS },
      relations: { team: { user: true } },
    });

    for (const tournament of onGoingTournaments) {
      for (const team of tournament.team) {
        const [player1, player2] = team.user;
        if (
          [player1.id, player2.id].includes(newPlayer1) ||
          [player1.id, player2.id].includes(newPlayer2)
        ) {
          throw new BadRequestException(
            'Uno o ambos jugadores ya están inscritos en un torneo que no ha finalizado',
          );
        }
      }
    }

    const teams = await this.teamRepository.find();
    const team = {
      name: TeamDto.name,
      category: tournament.category,
      user: players,
      tournament: tournament,
      order: teams.length,
    };
    await this.teamRepository.save(team);
    const cleanPlayers = team.user.map(user =>  {
      const {password, role, ...cleanUser} = user
      return cleanUser
    })
    const cleanTeam = {
      user: cleanPlayers,
      ...team
    }
    sender(player1.email, player2.email)
    return cleanTeam;
  }

  async findOneTeam(id: string) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!team) {
      throw new NotFoundException(
        'El equipo no existe, revisa la informacion proporcionada',
      );
    } else {
      return team;
    }
  }

  async findAllTeamsByTournament(tournamentId: string) {
    const tournament = await this.tournamentService.getTournament(tournamentId);
    if (!tournament.team.length) {
      throw new NotFoundException(
        'No se encontraron equipos inscriptos en este torneo.',
      );
    } else {
      return tournament.team;
    }
  }

  async preloadTeams() {
    const tournamentFromDb = await this.tournamentRepository.find();
    if (!tournamentFromDb.length) {
      throw new BadRequestException(
        'Debes precargar los torneos antes que los equipos',
      );
    }

    let orderTeam = 0;
    const users = await this.userRepository.find({ relations: ['category'] });

    for (let i = 1; i < users.length + 1; i += 2) {
      const teamIndex = Math.floor(i / 2);

      if (teamIndex < data.length) {
        const teamExist = await this.teamRepository.findOne({
          where: { name: data[teamIndex].name },
          relations: { user: true },
        });

        if (teamExist) {
          continue;
        }

        const user1 = users[i - 1];
        const user2 = users[i];

        if (
          user1.category &&
          user2.category &&
          user1.category.id === user2.category.id
        ) {
          data[teamIndex].user = [user1, user2];
          data[teamIndex].order = orderTeam;
          data[teamIndex].category = user1.category;

          const teamTournament = await this.tournamentRepository.findOne({
            where: { category: user1.category },
          });
          if (!teamTournament) {
            throw new NotFoundException(
              'No se encuentran torneos para esa categoria',
            );
          }

          data[teamIndex].tournament = teamTournament;
          orderTeam++;

          await this.teamRepository.save(data[teamIndex]);
        } else {
          throw new BadRequestException(
            `Los usuarios ${user1.id} y ${user2.id} no tienen la misma categoría y no se pueden asignar al mismo equipo.`,
          );
        }
      }
    }
    return { message: 'Equipos precargados correctamente' };
  }
}

// if (statusInscription === 'abiertas') {
//   for (const team of tournamentTeams) {
//     if (
//       (team.user[0] || team.user[1]) === (players[0] || players[1])
//     ) throw new BadRequestException('El jugador ya se encuentra inscripto a un torneo pendiente o en progreso');
//   }
// }
