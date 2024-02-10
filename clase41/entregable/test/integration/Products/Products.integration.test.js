// import supertest from "supertest";
// import { expect } from "chai";

// import configs from "../../../src/config.js";
// import mongoose from "mongoose";

// const PORT = configs.port;
// const requester = supertest(`http://localhost:${PORT}`);


// describe("Testing del módulo de Products", () => {
// 	after(async () => {
// 		try {
// 			await mongoose.connection.collections?.users.drop()
//       await mongoose.connection.collections?.products.drop();
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	});

// 	before(async () => {
// 		try {
// 			await mongoose.connection.collections?.users.drop()
//       await mongoose.connection.collections?.products.drop();
// 		} catch (error) {
// 			console.log(error.message);
// 		}
// 	});

//   after( async () => {
//     const userMock = {
// 			first_name: "Luciano",
// 			last_name: "Ferrando",
// 			email: "lferrando@gmail.com",
//       age: 29,
// 			password: "1234"
// 		};

//     const credentials = {
//       email: userMock.email,
//       password: userMock.password
//     }

// 		await requester.post("/api/sessions/register").send(userMock);
//     await requester.post("/api/sessions/login").send(credentials)

//   })

// 	it("Debemos registar un usuario correctamente", async () => {
// 		const userMock = {
// 			first_name: "Luciano",
// 			last_name: "Ferrando",
// 			email: "lferrando@gmail.com",
// 			age: 29,
// 			password: "1234"
// 		};
// 		const { statusCode, _body } = await requester
// 			.post("/api/sessions/register")
// 			.send(userMock);

// 		expect(statusCode).to.be.eql(201);
// 		expect(_body.payload).to.have.property("first_name");
// 		expect(_body.payload).to.have.property("last_name");
// 		expect(_body.payload).to.have.property("email");
// 		expect(_body.payload).to.have.property("age");

// 		expect(_body.payload.first_name).to.be.eql("Luciano");
// 		expect(_body.payload.last_name).to.be.eql("Ferrando");
// 		expect(_body.payload.email).to.be.eql("lferrando@gmail.com");
// 	});
// });
