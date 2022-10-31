const request = require("supertest");

const baseURL = "http://localhost:5000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRlNTRmZGI1NWI3MGJmODVhM2U5NTMiLCJpYXQiOjE2NjcyMTk2NzAsImV4cCI6MTY2NzIyMDU3MH0.dtX5PfVh6CfdISe4pMqyCXrhEfY6jrwAU7xOuxDWlF4";

describe("put /verify-reset-password", () => {
  const newPassword = {
    password: "shailendra",
    confirmPassword: "shailendra",
  };

  it("should reset the password", async () => {
    const response = await request(baseURL)
      .put("/verify-reset-password")
      .set("Authorization", `Bearer ${token}`)
      .send(newPassword);
    expect(response.status).toBe(200);
  });
});
