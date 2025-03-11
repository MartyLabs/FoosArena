const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let tournamentId;

describe("Tournament API Tests", () => {
  beforeAll(async () => {
    await prisma.$transaction([
      prisma.match.deleteMany(),
      prisma.team.deleteMany(),
      prisma.tournament.deleteMany(),
    ]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a tournament", async () => {
    const tournamentName = "Test tournament";

    const res = await request(app).post("/tournaments").send({
      name: tournamentName,
      description: "This is a description",
      date: "2025-06-15T00:00:00.000Z",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(tournamentName);
    tournamentId = res.body.id;
  });

  it("should retrieve tournament list", async () => {
    const res = await request(app).get("/tournaments");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should retrieve tournament by id", async () => {
    const res = await request(app).get(`/tournaments/${tournamentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(tournamentId);
  });

  it("should delete a tournament", async () => {
    const res = await request(app).delete(`/tournaments/${tournamentId}`);
    expect(res.statusCode).toBe(204);
  });
});
