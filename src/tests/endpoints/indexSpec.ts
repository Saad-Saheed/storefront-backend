import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Index route endpoints testing", () => {

    it("The homepage GET must return status code 200", async () => {
        // homepage route
        const response = await request.get('/api/');
        expect(response.statusCode).toBe(200);
    });
    it("/api/login POST must return success as it's status ", async () => {
        // login route
        const payload = {
            username: "odo",
            password: "password"
        };
        const response = await request.post('/api/login').send(payload);
        expect(response.body.status).toBe("success");
    });
    it("/api/five_most_porpular GET must return data in the res body and it must be of type object", async () => {
        // get five most porpular products with their order info
        const response = await request.get('/api/five_most_porpular');

        expect(response.body.data).toBeDefined();
        expect(typeof response.body.data).toBe('object');
    });

    it("/api/categories/electronic/products GET must return all product under electronic category as data in the res body and it must be of type object", async () => {
        // get all product from this category
        const response = await request.get('/api/categories/elect/products');

        expect(response.body.data).toBeDefined();
        expect(typeof response.body.data).toBe('object');
    });

});