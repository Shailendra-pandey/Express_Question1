const request = require("supertest");

const baseURL = "http://localhost:5000";

const email = "shailendra8@gmail.com";

describe("post /forgot-password", () => {
  it("should send password reset token", async () => {
    const response = await request(baseURL)
      .post("/forgot-password")
      .send(email);
    expect(response.status).toBe(200);
  });
});
