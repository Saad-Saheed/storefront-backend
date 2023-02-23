import { Product } from "../../models/product";
const prodT = new Product();
let last_inserted_id: undefined|number;

describe("Product model testing coverages", ()=>{

    describe("Required Method Definition ascertain", ()=>{
        it("index method must be define ", ()=>{          
            expect(prodT.index).toBeDefined();
        });
        it("show method must be define ", ()=>{
            expect(prodT.show).toBeDefined();
        });
        it("create method must be define ", ()=>{
            expect(prodT.create).toBeDefined();
        });
        it("update method must be define ", ()=>{
            expect(prodT.update).toBeDefined();
        });
       
    });

    describe("Model Method functionality testing", ()=>{
        it("must return the list of products", async()=>{
            expect((await prodT.index()).length).toBeGreaterThan(0);
        });

        it("must return a particular product", async()=>{
            expect(await prodT.show("7")).toBeTruthy();
        });

        it("must create new product", async()=>{           
            const newproduct = {
                name: "20kg paboiled rice",
                price: 18.1,
                category: "food"
            };
            const result = await prodT.create(newproduct);
            last_inserted_id = result.id;
            expect(result).toBeTruthy();
        });

        it("must update the existing product", async()=>{           
            const updatedproduct = {
                name: "20kg paboiled rice",
                price: 17.8,
                category: "food"
            };
            expect(await prodT.update(last_inserted_id ,updatedproduct)).toBeTruthy();
        });
        
        
    });
    
});