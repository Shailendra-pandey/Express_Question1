const request = require("supertest");

const baseURL = "http://localhost:5000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUyMjU4M2I1NjdmNGE0NmM2OWNiMDkiLCJpYXQiOjE2NjcyMTgzMzEsImV4cCI6MTY2NzIyMTkzMX0.t4tTC77p0fUPmMxhkZrWcEasbr4iFDs1-kmjhpgGNuM";

describe("post /address", () => {
  const newAddress = {
    address: "Noida ",
    city: "noida",
    state: "UP",
    pin_code: 171819,
    phone_no: 1234567890,
  };

  it("should add user address", async () => {
    const response = await request(baseURL)
      .post("/address")
      .set("Authorization", `Bearer ${token}`)
      .send(newAddress);
    expect(response.status).toBe(200);
  });
});
