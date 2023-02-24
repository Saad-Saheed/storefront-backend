import supertest from "supertest";
import { User } from "../../models/user";
import app from "../../server";

const request = supertest(app);
let last_user_id: unknown;
let last_token = "";

describe("User route endpoints testing", () => {
    it("/api/users POST must return status of success", async () => {
        // craete
        const newUser = {
            first_name: "Saheed",
            last_name: "Saad",
            username: "jambaoda",
            password: "password"
        };
        const response = await request.post('/api/users/').send(newUser);
        last_user_id = response.body.data.user.id;
        last_token = response.body.data.token;
        expect(response.body.status).toBe("success");
    });

    it("/api/users GET must return status of success", async () => {
        // read all
        const response = await request.get('/api/users')
            .set('Authorization', `Bearer ${last_token}`);
        expect(response.body.status).toBe("success");
    });

    it("/api/users/:id GET must return status of success", async () => {
        // read one
        const response = await request.get(`/api/users/${last_user_id}`)
            .set('Authorization', `Bearer ${last_token}`);
        expect(response.body.status).toBe("success");
    });

    it("/api/users/:id/active_orders GET must return status of failed", async () => {
        // read this user's ACTIVE orders
        const response = await request.get(`/api/users/${last_user_id}/active_orders`)
            .set('Authorization', `Bearer ${last_token}`);
        expect(response.body.status).toBe("failed");
    });

    it("/api/users/:id/completed_orders GET must return status of failed", async () => {
        // read this user's COMPLETED orders
        const response = await request.get(`/api/users/${last_user_id}/completed_orders`)
            .set('Authorization', `Bearer ${last_token}`);
        expect(response.body.status).toBe("failed");
    });

    afterAll( async ()=>{
        // delete user
        const userModel = new User();
        await userModel.delete(last_user_id as string);
    });


});