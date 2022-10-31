const request = require("supertest");

const baseURL = "http://localhost:5000";

jest.setTimeout(1000 * 1000);

describe("get /mobile", () => {
  it("should give details of mobile from flipkart", async () => {
    const response = await request(baseURL).get("/mobile");
    expect(response.status).toBe(200);
  });
});
