const request = require("supertest");

const baseURL = "http://localhost:5000";


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRmOTliZjUxYmIzYWFmYTM3ZmVjZjMiLCJpYXQiOjE2NjcyMTU0ODcsImV4cCI6MTY2NzIxOTA4N30.1BnkWovnRWzIUsvq3D9boeUqjr6Xd2EILw5z6h_sUfU'


describe("get /user", () => {

    it("should give user's details", async () => {
        const response = await request(baseURL).get("/user").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})
