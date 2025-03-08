const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Match Generation (Each team must meet at least once)
exports.generateMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Check if tournament exist
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { teams: true },
    });

    if (!tournament)
      return res.status(404).json({ message: "Tournament not found" });

    const teams = tournament.teams;

    if (teams.length < 2)
      return res.status(400).json({ message: "At least 2 teams are required" });

    // Generate all team combinations
    const matches = teams.flatMap((homeTeam, i) =>
      teams.slice(i + 1).map((awayTeam) => ({
        tournamentId,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
        homeScore: null,
        awayScore: null,
        winnerId: null,
      }))
    );

    // Insert matches into the database
    const createdMatches = await prisma.match.createMany({ data: matches });

    res.status(201).json({
      message: "Matches successfully generated",
      matches: createdMatches,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update match score
exports.updateMatchScore = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { homeScore, awayScore } = req.body;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) return res.status(404).json({ message: "Match not found" });

    // Determine the winner
    let winnerId = null;
    if (homeScore > awayScore) {
      winnerId = match.homeTeamId;
    } else if (awayScore > homeScore) {
      winnerId = match.awayTeamId;
    }

    // Update score inside database
    const updateMatch = await prisma.match.update({
      where: { id: matchId },
      data: { homeScore, awayScore, winnerId },
    });

    res
      .status(200)
      .json({ message: "Score has been updated", match: updatedMatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve matches from a tournament
exports.getMatchesByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const matches = await prisma.match.findMany({
      where: { tournamentId: tournamentId },
      include: { homeTeam: true, awayTeam: true },
    });

    res
      .status(200)
      .json({ message: "Matches successfully found", matches: matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
