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
