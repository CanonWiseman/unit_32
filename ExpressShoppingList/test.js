process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require('./app');
const list = require('./fakeDb');

const popsicle = {"name": "popsicle", "price": "1.25"}

beforeEach(() =>{
    list.push(popsicle);
})

afterEach(() =>{
    list.length = 0
});

describe("GET /items", () =>{
    test("Get all items", async () =>{
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([popsicle])
    });
})

describe("GET /items/name", () => {
    test("GET ITEM BY NAME", async () =>{
        const res = await request(app).get("/items/popsicle")
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(popsicle)
    });
});

describe("POST /items", () => {
    test("PUSH ITEM TO ARRAY", async () =>{
        const res = await request(app).post("/items").send([{name: 'cheerios', price: '1.45'}])
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({added:[ {name: 'cheerios', price: '1.45'}]})
    });
});

describe("PATCH /items/name", () => {
    test("UPDATE ITEM IN ARRAY", async () =>{
        const res = await request(app).patch("/items/popsicle").send({name: 'cheerios', price: '1.45'})
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({Updated:{name: 'cheerios', price: '1.45'}})
    });
});

describe("DELETE /items/name", () => {
    test("DELETE ITEM BY NAME", async () =>{
        const res = await request(app).delete("/items/popsicle")
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'})
        expect(list[0]).toEqual(undefined);
    });
});



