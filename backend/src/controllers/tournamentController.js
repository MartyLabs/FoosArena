const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Création d'un tournoi
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

// Récupération de tous les tournois en base
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération d'un tournoi par ID
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

// Suppression d'un tournoi
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
