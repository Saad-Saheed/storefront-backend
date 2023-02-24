import supertest from "supertest";
import { Order } from "../../models/order";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import app from "../../server";

const request = supertest(app)
const orderT = new Order();
let last_order_id: unknown;
let last_product_id: unknown;
let last_order_product_id: unknown;
let last_user_id: unknown;
let last_user_token: string;

describe("Order model testing coverages", ()=>{

    describe("Required Method Definition ascertain", ()=>{
        it("show method must be define ", ()=>{
            expect(orderT.show).toBeDefined();
        });
        it("create method must be define ", ()=>{
            expect(orderT.create).toBeDefined();
        });
        it("update method must be define ", ()=>{
            expect(orderT.update).toBeDefined();
        });
       
    });

    describe("Model Method functionality testing", ()=>{

       
        beforeAll( async ()=>{
            // create user
            const newUser = {
                first_name: "Nuru",
                last_name: "Laro",
                username: "agbado",
                password: "password"
            };
            const user_response = await request.post('/api/users/').send(newUser);
            last_user_id = user_response.body.data.user.id;
            last_user_token = user_response.body.data.token;

            // create product
            const newProduct = {
                name: "Hp p2015 printer",
                category: "Printer",
                price: 2102
            };
            const prod_response = await request.post('/api/products')
                .set('Authorization', `Bearer ${last_user_token}`)
                .send(newProduct);
            last_product_id = prod_response.body.data.id;
    
        });

        it("must create new order", async()=>{                       
            const neworder = {
                user_id: last_user_id as number,
                status: "active"
            };    
            // @ts-ignore        
            const result = await orderT.create(neworder);
            last_order_id = result.id;
            expect(result).toBeTruthy();
        });

        it("must return a particular order", async()=>{
            expect(await orderT.show(last_order_id as string)).toBeTruthy();
        });

        it("add product to the open order", async()=>{                       
            const neworder = {
                order_id: last_order_id as number,
                product_id: last_product_id as number,
                quantity: 9
            };    
            // @ts-ignore 
            const result = await orderT.addProduct(neworder);
            last_order_product_id = result.id;
            expect(result).toBeTruthy();
        });

        it("must update the existing order status", async()=>{           
            const updatedorder = {
                user_id: last_user_id as number,
                status: "completed"
            };
            // @ts-ignore 
            expect(await orderT.update(last_order_id, updatedorder)).toBeTruthy();
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
    
});