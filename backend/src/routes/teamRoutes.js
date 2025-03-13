const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.post("/", teamController.addTeam);
router.put("/:id", teamController.updateName);
router.get("/:tournamentId", teamController.getTeamsByTournament);
router.get("/single/:id", teamController.getTeamById);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
