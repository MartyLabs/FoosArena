require("dotenv").config();

const express = require("express");
const cors = require("cors");

const tournamentRoutes = require("./src/routes/tournamentRoutes");
const matchRoutes = require("./src/routes/matchRoutes");
const teamRoutes = require("./src/routes/teamRoutes");

const app = express();
app.use(cors());
app.use(express.json());

//Définition des routes
app.use("/tournament", tournamentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
