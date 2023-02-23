import { Order } from "../../models/order";
const orderT = new Order();
let last_inserted_id: undefined|number;

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

        it("must return a particular order", async()=>{
            expect(await orderT.show("3")).toBeTruthy();
        });

        it("must create new order", async()=>{                       
            const neworder = {
                user_id: 2,
                status: "active"
            };    
            // @ts-ignore        
            const result = await orderT.create(neworder);
            last_inserted_id = result.id;
            expect(result).toBeTruthy();
        });

        it("add product to the open order", async()=>{                       
            const neworder = {
                order_id: last_inserted_id,
                product_id: 2,
                quantity: 9
            };    
            // @ts-ignore 
            const result = await orderT.addProduct(neworder);
            expect(result).toBeTruthy();
        });

        it("must update the existing order status", async()=>{           
            const updatedorder = {
                user_id: 2,
                status: "completed"
            };
            // @ts-ignore 
            expect(await orderT.update(last_inserted_id ,updatedorder)).toBeTruthy();
        });
        
    });
    
});