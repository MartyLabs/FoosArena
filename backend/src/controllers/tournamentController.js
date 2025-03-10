const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Creating a tournament
exports.createTournament = async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const newTournament = await prisma.tournament.create({
      data: { name, description, date: new Date(date) },
    });
    res.status(201).json(newTournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieving all tournaments in the database
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieving a tournament by ID
exports.getTournamentById = async (red, res) => {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: req.params.id },
    });
    res.json(tournament);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deleting a tournament
exports.deleteTournament = async (req, res) => {
  try {
    await prisma.tournament.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tournament leaderboard
exports.getTournamentLeaderboard = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Récupérer toutes les équipes du tournoi
    const teams = await prisma.team.findMany({
      where: { tournamentId },
    });

    if (!teams.length)
      return res
        .status(404)
        .json({ message: "Aucune équipe trouvée pour ce tournoi" });

    let leaderboard = [];

    for (const team of teams) {
      let wins = 0,
        losses = 0,
        gamesPlayed = 0,
        points = 0;

      // Récupérer tous les matchs où l'équipe a joué
      const matches = await prisma.match.findMany({
        where: {
          tournamentId,
          OR: [{ team1Id: team.id }, { team2Id: team.id }],
        },
      });

      matches.forEach((match) => {
        if (match.score1 !== null && match.score2 !== null) {
          gamesPlayed++;

          // Vérifier si l'équipe était team1 ou team2
          const isTeam1 = match.team1Id === team.id;
          const isWinner = match.winnerId === team.id;

          if (isWinner) {
            wins++;
            points += 3;
          } else {
            losses++;
          }
        }
      });

      leaderboard.push({
        teamName: team.name,
        gamesPlayed,
        wins,
        losses,
        points,
      });
    }

    // Trier le classement par points (descendant)
    leaderboard.sort((a, b) => b.points - a.points);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
