import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
let last_inserted_id: undefined | number;

describe("Product route endpoints testing", () => {
    it("/api/products POST must return status of success", async () => {
        // craete
        const newproduct = {
            name: "Hp p2015 printer",
            category: "Printer",
            price: 2102
        };
        const response = await request.post('/api/products')
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2hhZWVkIiwibGFzdF9uYW1lIjoic2FhZCIsInVzZXJuYW1lIjoiamFtYmFvZGEiLCJwYXNzd29yZCI6IiQyYiQwNSR4YTZDUlRER2lqOUh2bXdLSXp5c1N1V25ySFozZm9tTkZKSjJsNU81czU4SFlxbGVlVU1GVyJ9LCJpYXQiOjE2NzcwODQ5NDB9.j64EshDguhzvhpEDxV5XdX4MXZ9LqRpgBQV1RaFdY2A`)
            .send(newproduct);
        last_inserted_id = response.body.data.id;

        expect(response.body.status).toBe("success");
    });

    it("/api/products GET must return status of success", async () => {
        // read all
        const response = await request.get('/api/products');
        expect(response.body.status).toBe('success');
    });

    it("/api/products/:id GET must return status of success", async () => {
        // read one
        const response = await request.get(`/api/products/${last_inserted_id}`);
        expect(response.body.status).toBe("success");
    });

    it("/api/products/:id PUT must return status of success", async () => {
        // update
        const updateproduct = {
            name: "Esposson 56RTU thermal printer",
            category: "Printers",
            price: 150
        };

        // update
        const response = await request.put(`/api/products/${last_inserted_id}`)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2hhZWVkIiwibGFzdF9uYW1lIjoic2FhZCIsInVzZXJuYW1lIjoiamFtYmFvZGEiLCJwYXNzd29yZCI6IiQyYiQwNSR4YTZDUlRER2lqOUh2bXdLSXp5c1N1V25ySFozZm9tTkZKSjJsNU81czU4SFlxbGVlVU1GVyJ9LCJpYXQiOjE2NzcwODQ5NDB9.j64EshDguhzvhpEDxV5XdX4MXZ9LqRpgBQV1RaFdY2A`)
            .send(updateproduct);
        last_inserted_id = response.body.data.id;
    });

});