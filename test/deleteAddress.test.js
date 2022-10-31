const request = require("supertest");

const baseURL = "http://localhost:5000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUyMjU4M2I1NjdmNGE0NmM2OWNiMDkiLCJpYXQiOjE2NjcyMTgzMzEsImV4cCI6MTY2NzIyMTkzMX0.t4tTC77p0fUPmMxhkZrWcEasbr4iFDs1-kmjhpgGNuM";

describe("delete /address", () => {
  it("should delete user address", async () => {
    const response = await request(baseURL)
      .delete("/address")
      .set("Authorization", `Bearer ${token}`)
    expect(response.status).toBe(200);
  });
});
