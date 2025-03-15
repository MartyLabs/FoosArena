const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");

const prisma = new PrismaClient();

// Add a new team to a tournament
exports.addTeam = async (req, res) => {
  try {
    const { name, tournamentId } = req.body;

    logger.info(`Adding new team: ${name} to tournament: ${tournamentId}`);

    // Check if tournament exists
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament) {
      logger.warn(`Tournament not found: ${tournamentId}`);
      return res.status(404).json({ message: "Tournament not found" });
    }

    // Create the team
    const team = await prisma.team.create({
      data: { name, tournamentId },
    });

    logger.info(`Team created: ${team.name} (ID: ${team.id})`);
    res.status(201).json(team);
  } catch (error) {
    logger.error(`Error creating a team: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update team name
exports.updateName = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    logger.info(`Updating team name (ID: ${id}) to "${name}"`);

    // Update team name
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: { name },
    });

    logger.info(`Team (ID: ${id}) updated successfully`);
    res.status(200).json(updatedTeam);
  } catch (error) {
    logger.error(`Error updating team name: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all teams in a tournament
exports.getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    logger.info(`Fetching all teams for tournament: ${tournamentId}`);

    const teams = await prisma.team.findMany({
      where: { tournamentId },
    });

    logger.info(
      `Retrieved ${teams.length} teams for tournament: ${tournamentId}`
    );
    res.status(200).json(teams);
  } catch (error) {
    logger.error(`Error retrieving teams for tournament: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a team by ID
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Fetching team details (ID: ${id})`);

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      logger.warn(`Team not found: ${id}`);
      return res.status(404).json({ message: "Team not found" });
    }

    logger.info(`Team found: ${team.name} (ID: ${id})`);
    res.status(200).json(team);
  } catch (error) {
    logger.error(`Error retrieving team: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a team (with match cleanup)
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Deleting team (ID: ${id}) and its associated matches`);

    // Check if team exists before deleting
    const teamExists = await prisma.team.findUnique({ where: { id } });

    if (!teamExists) {
      logger.warn(`Team not found: ${id}`);
      return res.status(404).json({ message: "Team not found" });
    }

    // First, delete all matches in which the team is involved
    await prisma.match.deleteMany({
      where: {
        OR: [{ team1Id: id }, { team2Id: id }],
      },
    });

    logger.info(`All matches involving team (ID: ${id}) have been deleted`);

    // Then, delete the team
    await prisma.team.delete({
      where: { id },
    });

    logger.info(`Team (ID: ${id}) deleted successfully`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting team: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
