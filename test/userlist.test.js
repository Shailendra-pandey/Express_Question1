const request = require('supertest')

const baseURL = "http://localhost:5000";

describe("get /userlist" , () => {
    it('should return user details', async () => {
        const response = await request(baseURL).get('/userlist?page=3&limit=10')
        expect(response.status).toBe(200)
    })
})