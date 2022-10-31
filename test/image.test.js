const request = require("supertest");
const path = require("path");

const baseURL = "http://localhost:5000";

describe("put /profile-image", () => {
  it("should add profile image", async () => {
    const image = path.resolve(__dirname, `./download.jpeg`);

    const response = await request(baseURL).put("/profile-image").send(image);
    expect(response.status).toBe(200);
  });
});
