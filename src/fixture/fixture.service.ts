import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(Fixture)
    private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @Inject()
    private matchService: MatchService,
  ) {}
  async createFixture(tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentID },
      relations: { team: true, matches: true, fixture: true, category: true },
    });
    const tournamentHasClosedInscription = tournament.inscription;
    const qTeams = tournament.team.length;
    const teamsArray = tournament.team.sort((team) => team.order);
    if (qTeams === 16 || qTeams === 32 || qTeams === 64) {
      if (tournamentHasClosedInscription === 'cerradas') {
        const stage =
          qTeams === 16
            ? 'octavos'
            : qTeams === 32
              ? 'dieciseisavos'
              : qTeams === 64
                ? 'treintaidosavos'
                : '';
        for (let i = 1; i < teamsArray.length + 1; i += 2) {
          if (i < teamsArray.length) {
            const teams = [teamsArray[i - 1], teamsArray[i]];
            const date = tournament.startDate;
            const time = tournament.startingTime;
            await this.matchService.createMatch({
              date,
              time,
              teams,
              tournament,
            });
            
          }
        }
        const matches = await this.matchService.getAllMatchesFromTournament(
          tournament.id,
        );
      
        const newRound = new Round();
        newRound.stage = stage;
        newRound.matches = matches;
        const round = await this.roundRepository.save(newRound);

        const fixture = new Fixture()
        const newFixture = await this.fixtureRepository.save(fixture)

        await this.tournamentRepository.update(tournament.id, {fixture: fixture})
        
        await this.roundRepository.update(round.id, {fixture: fixture})

        return { message: 'Fixture creado con exito', newFixture };
      } else {
        throw new BadRequestException(
          'Las inscripciones de este torneo deben estar cerradas',
        );
      }

    } else {
      throw new BadRequestException(
        'El torneo no puede cerrarse ya que no cumple con la cantidad de equipos',
      );
    }
  }
}
