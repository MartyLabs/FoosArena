require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const errorHandler = require("./src/middleware/errorHandler"); // Winston middleware used to handle errors

const tournamentRoutes = require("./src/routes/tournamentRoutes");
const matchRoutes = require("./src/routes/matchRoutes");
const teamRoutes = require("./src/routes/teamRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use(helmet()); // Secures HTTP headers
app.use(compression()); // Compresses responses

app.use(errorHandler);

//Définition des routes
app.use("/tournaments", tournamentRoutes);
app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
