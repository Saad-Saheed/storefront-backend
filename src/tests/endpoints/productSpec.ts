import supertest from "supertest";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import app from "../../server";

const request = supertest(app);
let last_product_id: unknown;
let last_user_id: unknown;
let last_token: unknown;

describe("Product route endpoints testing", () => {

    beforeAll( async ()=>{
        // create user
        const newUser = {
            first_name: "Abdullahi",
            last_name: "Muhammad",
            username: "muhammad123",
            password: "password"
        };
        const user_response = await request.post('/api/users/').send(newUser);
        last_user_id = user_response.body.data.user.id;
        last_token = user_response.body.data.token;
    });

    it("/api/products POST must return status of success", async () => {
        // craete product 
        const newproduct = {
            name: "Hp p2015 printer",
            category: "Printer",
            price: 2102
        };
        const response = await request.post('/api/products')
            .set('Authorization', `Bearer ${last_token}`)
            .send(newproduct);
        last_product_id = response.body.data.id;

        expect(response.body.status).toBe("success");
    });

    it("/api/products GET must return status of success", async () => {
        // read all
        const response = await request.get('/api/products');
        expect(response.body.status).toBe('success');
    });

    it("/api/products/:id GET must return status of success", async () => {
        // read one
        const response = await request.get(`/api/products/${last_product_id}`);
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
        const response = await request.put(`/api/products/${last_product_id}`)
            .set('Authorization', `Bearer ${last_token}`)
            .send(updateproduct);
        last_product_id = response.body.data.id;
    });

    afterAll( async ()=>{
        // delete product
        const prodModel = new Product();
        await prodModel.delete(last_product_id as string);

        // delete user
        const userModel = new User();
        await userModel.delete(last_user_id as string);
    });

});