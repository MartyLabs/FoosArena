const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let tournamentId, teamId;

describe("Team API Tests", () => {
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
