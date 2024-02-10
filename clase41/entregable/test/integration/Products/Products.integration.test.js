import supertest from "supertest";
import { expect } from "chai";
import configs from "../../../src/config.js";
import mongoose from "mongoose";
import { conn } from "../../../src/dao/factory.js";


const PORT = configs.port;
const requester = supertest(`http://localhost:${PORT}`);

let cookie

describe("Pruebas de integración módulo de Products", () => {
	after(async () => {
		try {
			await conn.connection.collections?.users?.drop();
			await conn.connection.collections?.products?.drop();
			await conn.connection.collections?.sessions?.drop();
		} catch (error) {
			console.log(error.message);
		}
	});

  before( async () => {
    const userMock = {
			first_name: "Jorge",
			last_name: "Perez",
			email: "jperez@gmail.com",
      age: 21,
			password: "123456"
		};

    const credentials = {
      email: userMock.email,
      password: userMock.password
    }

		await requester.post("/api/sessions/register").send(userMock);
    const loginResult = await requester.post("/api/sessions/login").send(credentials)

    const cookieResult = loginResult.headers["set-cookie"][0];
		const cookieResultSplit = cookieResult.split("=");
		cookie = {
			name: cookieResultSplit[0],
			value: cookieResultSplit[1]
		};

  })

	it("POST de /api/products para crear un producto en la base de datos", async () => {
		const productMock = {
			title: "Asus ROG Strix 2024",
			description: "Notebook gamer última generación. Genial para jugar a los más recientes videojuegos. RTX 4090, 32 Gb Ram",
			price: 150000,
			thumbnail: [],
			code: "notebook-001",
      stock: 10,
      status: true
		};

		const { statusCode, _body } = await requester
			.post("/api/products/")
			.send(productMock).set("Cookie", [`${cookie.name}=${cookie.value}`]);

		expect(statusCode).to.be.eql(201);
		expect(_body.payload).to.have.property("title");
		expect(_body.payload).to.have.property("description");
		expect(_body.payload).to.have.property("price");
		expect(_body.payload).to.have.property("code");

		expect(_body.payload.title).to.be.eql(productMock.title);
		expect(_body.payload.description).to.be.eql(productMock.description);
		expect(_body.payload.price).to.be.eql(productMock.price);
		expect(_body.payload.code).to.be.eql(productMock.code);
	});
});
