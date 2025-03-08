const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add team to a tournament
exports.addTeam = async (req, res) => {
  try {
    const { name, tournamentId } = req.body;

    // Check if tournament exist
    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament)
      return res.status(404).json({ message: "Tournament not found" });

    const team = await prisma.team.create({
      data: { name, tournamentId },
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teams in the tournament
exports.getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const teams = await prisma.team.findMany({
      where: { tournamentId },
    });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve Team by ID
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.team.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
