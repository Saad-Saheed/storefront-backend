import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Order route endpoints testing", () => {

    it("/api/orders/ POST must create new order and return status code 200", async () => {
        // create
        const neworder = {
            user_id: 1,
            status: "active"
        }
        const response = await request.post('/api/orders/').send(neworder);
        expect(response.statusCode).toBe(200);
    });

    it("/api/orders/3 GET must return status of success", async () => {
        // read one
        const response = await request.get('/api/orders/3');
        expect(response.body.status).toBe("success");
    });

    it("/api/orders/1/products POST must return status of success", async () => {
        // addproduct
        const cart = {
            product_id: 4,
            quantity: 24
        }
        const response = await request.post('/api/orders/1/products').send(cart);
        expect(response.body.status).toBe("success");
    });

    it("/api/orders/2 PUT must return status of success", async () => {
        // update
        const updateorder = {
            user_id: 1,
            status: "completed"
        }
        const response = await request.put('/api/orders/2')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoic2hhZWVkIiwibGFzdF9uYW1lIjoic2FhZCIsInVzZXJuYW1lIjoiamFtYmFvZGEiLCJwYXNzd29yZCI6IiQyYiQwNSR4YTZDUlRER2lqOUh2bXdLSXp5c1N1V25ySFozZm9tTkZKSjJsNU81czU4SFlxbGVlVU1GVyJ9LCJpYXQiOjE2NzcwODQ5NDB9.j64EshDguhzvhpEDxV5XdX4MXZ9LqRpgBQV1RaFdY2A`)
        .send(updateorder);
        expect(response.body.status).toBe("success");
    });

});