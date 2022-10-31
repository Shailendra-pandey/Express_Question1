const request = require("supertest");

const baseURL = "http://localhost:5000";

jest.setTimeout(30 * 1000);


describe("get /tshirt", () => {
  it("should give details of tshirt from snapdeal", async () => {
    const response = await request(baseURL).get("/tshirt");
    expect(response.status).toBe(200);
  });
});
