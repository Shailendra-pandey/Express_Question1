const request = require("supertest");

const baseURL = "http://localhost:5000";

describe("post /register", () => {
  const newUser = {
    firstName: "shailendra",
    lastName: "pandey",
    userName: "shailendra99",
    email: "shailendra99@gmail.com",
    password: "shailendra",
    confirmPassword: "shailendra",
  }

  it("should register user", async () => {
    const response = await request(baseURL).post("/register").send(newUser);
    expect(response.status).toBe(200)
  })

});
