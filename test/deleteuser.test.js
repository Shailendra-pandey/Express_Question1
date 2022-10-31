const request = require("supertest");

const baseURL = "http://localhost:5000";


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUyMjUzMWY5MDdiYTU3NGZiNzEyYTIiLCJpYXQiOjE2NjcyMTY0MTMsImV4cCI6MTY2NzIyMDAxM30.vFhwW37M3LAksKwBJbORswMdY-WrD5R7crkIRB9kh_Y'


describe("get /deleteuser", () => {

    it("should delete the user", async () => {
        const response = await request(baseURL).put("/deleteuser").set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})
