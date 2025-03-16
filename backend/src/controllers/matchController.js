const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");

const prisma = new PrismaClient();

// Match Generation (Each team must meet at least once)
exports.generateMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    logger.info(`Generating matches for tournament: ${tournamentId}`);

    // Check if the tournament exists
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { teams: true },
    });

    if (!tournament) {
      logger.warn(`Tournament not found: ${tournamentId}`);
      return res.status(404).json({ message: "Tournament not found" });
    }

    const teams = tournament.teams;
    if (teams.length < 2) {
      logger.warn(`Not enough teams in tournament: ${tournamentId}`);
      return res.status(400).json({ message: "At least 2 teams are required" });
    }

    // Match generation
    const matches = teams.flatMap((team1, i) =>
      teams.slice(i + 1).map((team2) => ({
        tournamentId,
        team1Id: team1.id,
        team2Id: team2.id,
        score1: null,
        score2: null,
        winnerId: null,
      }))
    );

    const createdMatches = await prisma.match.createMany({ data: matches });

    logger.info(
      `Successfully generated ${matches.length} matches for tournament: ${tournamentId}`
    );
    res.status(201).json({
      message: "Matches successfully generated",
      matches: createdMatches,
    });
  } catch (error) {
    logger.error(`Error generating matches: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update match score
exports.updateMatchScore = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { score1, score2 } = req.body;

    logger.info(`Updating score for match: ${matchId}`);

    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      logger.warn(`Match not found: ${matchId}`);
      return res.status(404).json({ message: "Match not found" });
    }

    // Determining the winner
    let winnerId = null;
    if (score1 > score2) winnerId = match.team1Id;
    else if (score2 > score1) winnerId = match.team2Id;

    // Score update
    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { score1, score2, winnerId },
    });

    logger.info(`Match ${matchId} updated - Score: ${score1}-${score2}`);
    res
      .status(200)
      .json({ message: "Score has been updated", match: updatedMatch });
  } catch (error) {
    logger.error(`Error updating match score: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve matches from a tournament
exports.getMatchesByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    logger.info(`Fetching matches for tournament: ${tournamentId}`);

    const matches = await prisma.match.findMany({
      where: { tournamentId },
      include: { team1: true, team2: true },
    });

    res.status(200).json({ message: "Matches successfully found", matches });
  } catch (error) {
    logger.error(`Error retrieving matches for tournament: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve matches by team
exports.getMatchesByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    logger.info(`Fetching matches for team: ${teamId}`);

    const matches = await prisma.match.findMany({
      where: { OR: [{ team1Id: teamId }, { team2Id: teamId }] },
      include: { team1: true, team2: true },
    });

    res.status(200).json({ message: "Matches for team found", matches });
  } catch (error) {
    logger.error(`Error retrieving matches for team: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a single match by ID
exports.getMatchById = async (req, res) => {
  try {
    const { matchId } = req.params;
    logger.info(`Fetching match details: ${matchId}`);

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { team1: true, team2: true, tournament: true },
    });

    if (!match) {
      logger.warn(`Match not found: ${matchId}`);
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match found", match });
  } catch (error) {
    logger.error(`Error retrieving match: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete all matches in a tournament
exports.deleteMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    logger.info(`Deleting all matches for tournament: ${tournamentId}`);

    await prisma.match.deleteMany({ where: { tournamentId } });

    logger.info(`Matches deleted for tournament: ${tournamentId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting matches: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
