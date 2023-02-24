import bcrypt from "bcrypt";
import { User } from "../../models/user";
const userT = new User();
const { PASSWORD_SALT, SALT_ROUNDS } = process.env;
let last_user_id: unknown;

describe("User model testing coverages", ()=>{

    describe("Required Method Definition ascertain", ()=>{
        it("index method must be defined ", ()=>{          
            expect(userT.index).toBeDefined();
        });
        it("show method must be defined ", ()=>{
            expect(userT.show).toBeDefined();
        });
        it("create method must be defined ", ()=>{
            expect(userT.create).toBeDefined();
        });
        it("activeOrders method must be defined ", ()=>{
            expect(userT.activeOrders).toBeDefined();
        });
        it("completeOrders method must be defined ", ()=>{
            expect(userT.completedOrders).toBeDefined();
        });
    });

    describe("Model Method functionality testing", ()=>{

        it("must create new user", async()=>{            
            const hashed_password = bcrypt.hashSync("password"+PASSWORD_SALT, parseInt(SALT_ROUNDS as string));
            const newUser = {
                first_name: "fatimoh",
                last_name: "issa",
                username: "fatti",
                password: hashed_password
            };
            const user = await userT.create(newUser);
            last_user_id = user.id;
            expect(user).toBeTruthy();
        });
        

        it("must return the list of users", async()=>{
            expect((await userT.index()).length).toBeGreaterThan(0);
        });

        it("must return the user", async()=>{
            expect(await userT.show(last_user_id as (string))).toBeTruthy();
        });
       
        it("must return this user's active orders", async()=>{
            expect((await userT.activeOrders(last_user_id as (string))).length).toBeGreaterThanOrEqual(0);
        });

        it("must return this user's completed orders", async()=>{
            expect((await userT.completedOrders(last_user_id as (string))).length).toBeGreaterThanOrEqual(0);
        });

        afterAll( async ()=>{
            // delete user
            const userModel = new User();
            await userModel.delete(last_user_id as string);
        });
    });
    
});