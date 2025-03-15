const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");

const prisma = new PrismaClient();

// Create a tournament
exports.createTournament = async (req, res) => {
  try {
    const { name, description, date } = req.body;
    logger.info(`Creating tournament: ${name}`);

    const newTournament = await prisma.tournament.create({
      data: { name, description, date: new Date(date) },
    });

    logger.info(`Tournament created successfully: ${newTournament.id}`);
    res.status(201).json(newTournament);
  } catch (error) {
    logger.error(`Error creating a tournament: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve all tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    logger.info("Fetching all tournaments...");

    const tournaments = await prisma.tournament.findMany();

    logger.info(`Retrieved ${tournaments.length} tournaments`);
    res.status(200).json(tournaments);
  } catch (error) {
    logger.error(`Error retrieving tournaments: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching tournament details (ID: ${id})`);

    const tournament = await prisma.tournament.findUnique({ where: { id } });

    if (!tournament) {
      logger.warn(`Tournament not found: ${id}`);
      return res.status(404).json({ message: "Tournament not found" });
    }

    logger.info(`Tournament retrieved: ${id}`);
    res.status(200).json(tournament);
  } catch (error) {
    logger.error(`Error retrieving tournament: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a tournament (and its related data)
exports.deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Attempting to delete tournament (ID: ${id})`);

    // Check if the tournament exists before deleting
    const tournamentExists = await prisma.tournament.findUnique({
      where: { id },
    });

    if (!tournamentExists) {
      logger.warn(`Tournament not found: ${id}`);
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Delete all associated matches
    await prisma.match.deleteMany({ where: { tournamentId: id } });

    // Delete all associated teams
    await prisma.team.deleteMany({ where: { tournamentId: id } });

    // Delete the tournament itself
    await prisma.tournament.delete({ where: { id } });

    logger.info(`Tournament (ID: ${id}) deleted successfully`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting tournament: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🏆 Get tournament leaderboard
exports.getTournamentLeaderboard = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    logger.info(`Fetching leaderboard for tournament: ${tournamentId}`);

    // Retrieve teams in the tournament
    const teams = await prisma.team.findMany({ where: { tournamentId } });

    if (teams.length === 0) {
      logger.warn(`No teams found in tournament: ${tournamentId}`);
      return res
        .status(404)
        .json({ message: "No teams found for this tournament" });
    }

    // Prepare leaderboard
    const leaderboard = await Promise.all(
      teams.map(async (team) => {
        const matches = await prisma.match.findMany({
          where: {
            tournamentId,
            OR: [{ team1Id: team.id }, { team2Id: team.id }],
          },
        });

        let wins = 0,
          losses = 0,
          gamesPlayed = 0,
          points = 0;

        matches.forEach((match) => {
          if (match.score1 !== null && match.score2 !== null) {
            gamesPlayed++;
            if (match.winnerId === team.id) {
              wins++;
              points += 3;
            } else {
              losses++;
            }
          }
        });

        return {
          teamName: team.name,
          gamesPlayed,
          wins,
          losses,
          points,
        };
      })
    );

    // Sort teams by points (highest to lowest)
    leaderboard.sort((a, b) => b.points - a.points);

    logger.info(`Leaderboard retrieved for tournament: ${tournamentId}`);
    res.status(200).json(leaderboard);
  } catch (error) {
    logger.error(`Error retrieving leaderboard: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
