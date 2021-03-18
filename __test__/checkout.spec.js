


const supertest = require ('supertest');
const { app} = require('../src/index');

    
describe("Testing the carts  API", () => {
    let productA = null;
    let productB = null;
    let productC = null;
    let productD = null;
    
    it ("add the product A,B,C ", async () =>{

        await supertest(app).delete('/cart/empty-cart');
          productA = await supertest(app).post('/product').send({
    
            "name": "a",
            "price": 30
        });

         productB = await supertest(app).post('/product').send({
    
            "name": "b",
            "price": 20
        });


         productC = await supertest(app).post('/product').send({
    
            "name": "c",
            "price": 50
        });

        productD = await supertest(app).post('/product').send({
    
            "name": "d",
            "price": 15
        });


        await supertest(app).post('/promotion').send({
            "ruleId": "RULE001",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": productA.body.data._id,
            "productName": "A",
            "discount": 5,
            "discountType": 1,
            "quantity": 3,
            "price": null,
            "date": "2021-09-25",
            "isEnabled": true
        
        })

        await supertest(app).post('/promotion').send({
            "ruleId": "RULE002",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": productB.body.data._id,
            "productName": "B",
            "discount": 5,
            "discountType": 2,
            "quantity": 2,
            "price": null,
            "date": "2021-09-25",
            "isEnabled": true
        
        })

        await supertest(app).post('/promotion').send({
            "ruleId": "RULE003",
            "ruleDescription": "if quantity is 3 or multiples of 3 then 5 rs discount will be given",
            "product": "BASKET",
            "productName": "BASKET",
            "discount": 20,
            "discountType": 3,
            "quantity": null,
            "price": 150,
            "date": "2021-09-25",
            "isEnabled": true
        
        })


        await supertest(app).post('/cart').send({
    
            "productId": productA.body.data._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productB.body.data._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productC.body.data._id,
            "quantity": 1
        })

       let checkout =  await supertest(app).get('/cart/checkout');

        expect(checkout.status).toBe(200);
        expect(checkout.body.status).toBe(true);
        expect(checkout.body.data.total).toBe(100);
    })


	it(" A, A, A, B, B", async () => {
        //const response = [{ id: 3, url: "https://www.link3.dev" }];
         await supertest(app).delete('/cart/empty-cart');

		await supertest(app).post('/cart').send({
    
            "productId": productA.body.data._id,
            "quantity": 3
        })

        await supertest(app).post('/cart').send({
    
            "productId": productB.body.data._id,
            "quantity": 2
        })

       let checkout =  await supertest(app).get('/cart/checkout');

        expect(checkout.status).toBe(200);
        expect(checkout.body.status).toBe(true);
        expect(checkout.body.data.total).toBe(110);
    
		

	});

    it("C, B, A, A, D, A, B", async () => {
        //const response = [{ id: 3, url: "https://www.link3.dev" }];
        await supertest(app).delete('/cart/empty-cart');

		await supertest(app).post('/cart').send({
    
            "productId": productA.body.data._id,
            "quantity": 3
        })

        await supertest(app).post('/cart').send({
    
            "productId": productB.body.data._id,
            "quantity": 2
        })

        await supertest(app).post('/cart').send({
    
            "productId": productC.body.data._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productD.body.data._id,
            "quantity": 1
        })

       let checkout =  await supertest(app).get('/cart/checkout');

        expect(checkout.status).toBe(200);
        expect(checkout.body.status).toBe(true);
        expect(checkout.body.data.total).toBe(155);
    
		

	});



    it("C,  A, A, D, A", async () => {
        //const response = [{ id: 3, url: "https://www.link3.dev" }];
        await supertest(app).delete('/cart/empty-cart');

		await supertest(app).post('/cart').send({
    
            "productId": productA.body.data._id,
            "quantity": 3
        })

        await supertest(app).post('/cart').send({
    
            "productId": productC.body.data._id,
            "quantity": 1
        })

        await supertest(app).post('/cart').send({
    
            "productId": productD.body.data._id,
            "quantity": 1
        })

       let checkout =  await supertest(app).get('/cart/checkout');

        expect(checkout.status).toBe(200);
        expect(checkout.body.status).toBe(true);
        expect(checkout.body.data.total).toBe(140);
    
		

	});

});

// describe("Testing the movies API", () => {
//     it("tests our testing framework if it works", () => {
//     expect(2).toBe(2);
//   });
// });