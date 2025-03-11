const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let tournamentId, team1Id, team2Id;

describe("Match API Tests", () => {
  beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Match", "Team", "Tournament" RESTART IDENTITY CASCADE;`;

    const tournament = await prisma.tournament.create({
      data: {
        name: "Clementine Tournament",
        date: new Date(),
        description: "This is a description",
      },
    });

    tournamentId = tournament.id;

    const team1 = await prisma.team.create({
      data: { name: "Team Alpha", tournamentId },
    });
    team1Id = team1.id;

    const team2 = await prisma.team.create({
      data: { name: "Team Beta", tournamentId },
    });
    team2Id = team2.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should generate tournament matches", async () => {
    const res = await request(app).post(`/matches/generate/${tournamentId}`);
    expect(res.statusCode).toBe(201);
  });

  it("should retrieve tournament matches", async () => {
    const res = await request(app).get(`/matches/${tournamentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.matches.length).toBeGreaterThan(0);
  });

  it("should update the score of a match", async () => {
    const matches = await prisma.match.findMany({ where: { tournamentId } });
    const matchId = matches[0].id;

    const res = await request(app)
      .post(`/matches/update-score/${matchId}`)
      .send({
        score1: 3,
        score2: 1,
      });

    expect(res.statusCode).toBe(200);
  });
});
