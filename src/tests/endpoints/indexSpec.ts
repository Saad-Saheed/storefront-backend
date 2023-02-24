import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";

let last_username: unknown;
let last_user_id: unknown;
let last_password: unknown;
const request = supertest(app);

describe("Index route endpoints testing", () => {

    beforeAll( async ()=>{
        // create user
        const newUser = {
            first_name: "Alabi",
            last_name: "Jamiu",
            username: "jamiu123",
            password: "password"
        };
        const user_response = await request.post('/api/users/').send(newUser);
        last_user_id = user_response.body.data.user.id;
        last_username = user_response.body.data.user.username;
        last_password = newUser.password;
    });

    it("The homepage GET must return status code 200", async () => {
        // homepage route
        const response = await request.get('/api/');
        expect(response.statusCode).toBe(200);
    });
    it("/api/login POST must return success as it's status ", async () => {
        // login route
        const payload = {
            username: last_username,
            password: last_password
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

    afterAll( async ()=>{
        // delete user
        const userModel = new User();
        await userModel.delete(last_user_id as string);
    });

});