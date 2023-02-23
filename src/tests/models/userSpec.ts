import bcrypt from "bcrypt";
import { User } from "../../models/user";
const userT = new User();
const { PASSWORD_SALT, SALT_ROUNDS } = process.env;

describe("User model testing coverages", ()=>{

    describe("Required Method Definition ascertain", ()=>{
        it("index method must be define ", ()=>{          
            expect(userT.index).toBeDefined();
        });
        it("show method must be define ", ()=>{
            expect(userT.show).toBeDefined();
        });
        it("create method must be define ", ()=>{
            expect(userT.create).toBeDefined();
        });
        it("activeOrders method must be define ", ()=>{
            expect(userT.activeOrders).toBeDefined();
        });
        it("completeOrders method must be define ", ()=>{
            expect(userT.completedOrders).toBeDefined();
        });
    });

    describe("Model Method functionality testing", ()=>{
        it("must return the list of users", async()=>{
            expect((await userT.index()).length).toBeGreaterThan(0);
        });

        it("must return the user", async()=>{
            expect(await userT.show("2")).toBeTruthy();
        });

        it("must create new user", async()=>{            
            const hashed_password = bcrypt.hashSync("password"+PASSWORD_SALT, parseInt(SALT_ROUNDS as string));
            const newUser = {
                first_name: "fatimoh",
                last_name: "issa",
                username: "fatty",
                password: hashed_password
            };
            expect(await userT.create(newUser)).toBeTruthy();
        });
        
        it("must return this user's active orders", async()=>{
            expect((await userT.activeOrders("1")).length).toBeGreaterThan(0);
        });

        it("must return this user's completed orders", async()=>{
            expect((await userT.completedOrders("2")).length).toBeGreaterThan(0);
        });
    });
    
});