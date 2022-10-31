const request = require("supertest");

const baseURL = "http://localhost:5000";

describe("post /login", () => {
  const loginDetail = {
    email: "shailendra4@gmail.com",
    password: "shailendra",
  };

  it("should login user", async () => {
    const response = await request(baseURL).post('/login').send(loginDetail);
    expect(response.status).toBe(200)
  })

});
