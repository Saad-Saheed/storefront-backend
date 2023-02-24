import supertest from "supertest";
import { Order } from "../../models/order";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import app from "../../server";

let last_order_id: unknown;
let last_order_product_id: unknown;
let last_user_id: unknown;
let last_product_id: unknown;
let last_token: string;
const request = supertest(app);

describe("Order route endpoints testing", () => {

    beforeAll( async ()=>{
        // create user
        const newUser = {
            first_name: "Saheed",
            last_name: "Saad",
            username: "jambaoda",
            password: "password"
        };
        const user_response = await request.post('/api/users/').send(newUser);
        last_user_id = user_response.body.data.user.id;
        last_token = user_response.body.data.token;

        // create product
        const newproduct = {
            name: "Wireless mouse",
            category: "Accessories",
            price: 12
        };
        const prod_response = await request.post('/api/products')
            .set('Authorization', `Bearer ${last_token}`)
            .send(newproduct);
        last_product_id = prod_response.body.data.id;

    });

    it("/api/orders/ POST must create new order and return status code 200", async () => {
        // create
        const neworder = {
            user_id: last_user_id,
            status: "active"
        }
        const response = await request.post('/api/orders/')
            .set('Authorization', `Bearer ${last_token}`)
            .send(neworder);
        last_order_id = response.body.data.id;
        expect(response.statusCode).toBe(200);
    });

    it("/api/orders/:id GET must return status of success", async () => {
        // read one
        const response = await request.get(`/api/orders/${last_order_id}`).set('Authorization', `Bearer ${last_token}`);
        expect(response.body.status).toBe("success");
    });

    it("/api/orders/:id/products POST must return status of success", async () => {
        // addproduct
        const cart = {
            product_id: last_product_id,
            quantity: 24
        }
        const response = await request.post(`/api/orders/${last_order_id}/products`)
            .set('Authorization', `Bearer ${last_token}`)
            .send(cart);
        last_order_product_id = response.body.data.id;
        expect(response.body.status).toBe("success");
    });

    it("/api/orders/:id PUT must return status of success", async () => {
        // update
        const updateorder = {
            user_id: last_user_id,
            status: "completed"
        }
        const response = await request.put(`/api/orders/${last_order_id}`)
        .set('Authorization', `Bearer ${last_token}`)
        .send(updateorder);
        expect(response.body.status).toBe("success");
    });

    afterAll( async ()=>{
        // delete order_products
        const orderModel = new Order();
        await orderModel.deleteOrderProduct(last_order_product_id as string);

        // delete order
        await orderModel.delete(last_order_id as string);

        // delete product
        const prodModel = new Product();
        await prodModel.delete(last_product_id as string);

        // delete user
        const userModel = new User();
        await userModel.delete(last_user_id as string);
    });
    

});