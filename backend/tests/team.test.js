const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let tournamentId, teamId;

describe("Team API Tests", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Match", "Team", "Tournament" RESTART IDENTITY CASCADE;`;

    await prisma.tournament.create({
      data: { name: "Tournoi Test", date: new Date(), description: "Test" },
    });

    const tournament = await prisma.tournament.findFirst({
      where: { name: "Tournoi Test" },
    });

    tournamentId = tournament ? tournament.id : null;

    console.log("Tournament ID after creation:", tournamentId);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should add a team", async () => {
    const teamName = "Clementine Team";

    const res = await request(app).post("/teams").send({
      name: teamName,
      tournamentId,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(teamName);
    expect(res.body.id).toBeDefined();

    teamId = res.body.id;
  });

  it("should retrieve all the teams from a tournament", async () => {
    const res = await request(app).get(`/teams/${tournamentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a team by his ID", async () => {
    const res = await request(app).get(`/teams/single/${teamId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(teamId);
  });

  it("should delete a team", async () => {
    const res = await request(app).delete(`/teams/${teamId}`);
    expect(res.statusCode).toBe(204);
  });
});
