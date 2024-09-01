// async createMatch2({ teams, tournament }) {
//     const currentHour = new Date(tournament.startingTime).getTime();
//     const endHour = new Date(tournament.finishTime).getTime();
//     const matchDuration = tournament.matchDuration * 60 * 1000; // Convertir la duración de partidos a milisegundos
//     const matches = [];
    
//     const courts = tournament.courtsAvailable;
//     let courtsIndex = 0;

//     // Calcula cuántos turnos se pueden realizar en un día
//     const totalTurnDuration = endHour - currentHour;
//     const turnsPerDay = Math.floor(totalTurnDuration / matchDuration);

//     let appointmentCounter = 1;
//     let tournIndex = 0;

//     let remainingTeams = teams.length;

//     // Copiamos el array de equipos para evitar modificar el original
//     let teamsCopy = [...teams];

//     while (tournIndex < tournament.playingDay.length && remainingTeams > 1) {
//         let dateParaUsar = tournament.playingDay[tournIndex];
//         let turnCounter = 0;

//         while (turnCounter < turnsPerDay && remainingTeams > 1) {
//             // Reseteamos el índice de canchas
//             courtsIndex = 0;
            
//             // Iteramos sobre los equipos de dos en dos
//             for (let i = 0; i < teamsCopy.length - 1 && courtsIndex < courts; i += 2) {
//                 const team1 = await this.teamRepository.findOne({ where: { name: teamsCopy[i].name } });
//                 const team2 = await this.teamRepository.findOne({ where: { name: teamsCopy[i + 1].name } });

//                 if (!team1 || !team2) {
//                     throw new NotFoundException('No se encontró uno de los equipos');
//                 }

//                 const newMatch = {
//                     tournament,
//                     teams: [team1, team2],
//                     date: dateParaUsar,
//                     appointment: appointmentCounter,
//                     court: courtsIndex + 1 // Asigna la cancha según el índice
//                 };

//                 const savedMatch = await this.matchRepository.save(newMatch);
//                 matches.push(savedMatch);

//                 // Actualizar el estado de los equipos y canchas
//                 courtsIndex++;
//                 remainingTeams -= 2;

//                 // Remover los equipos que ya jugaron
//                 teamsCopy.splice(i, 2);
//                 i -= 2; // Ajustar el índice para la siguiente iteración
//             }

//             appointmentCounter += 1;
//             turnCounter += 1;
//         }

//         tournIndex += 1; // Pasamos al siguiente día
//     }

//     return matches;
// }