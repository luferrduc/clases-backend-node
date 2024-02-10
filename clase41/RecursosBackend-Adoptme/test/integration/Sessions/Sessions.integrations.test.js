import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose"

const requester = supertest("http://localhost:8080");

describe("Pruebas de integración del módulo de sessions", () => {
	after( async () => {
    try {
      await mongoose.connection.collections?.users.drop()
    } catch (error) {
      console.log(error.message)
    }
  })
	let cookie;

	it("Debemos registar un usuario correctamente", async () => {
		const userMock = {
			first_name: "Coder",
			last_name: "House",
			email: "ch@coder.com",
			password: "1234"
		};
		const { statusCode } = await requester.post("/api/sessions/register").send(userMock);
		expect(statusCode).to.be.eql(200);
	});

	it("Debemos loguear al usuario y retonrar una cookie", async () => {
		const credentialsMock = {
			email: "ch@coder.com",
			password: "1234"
		};
		const loginResult = await requester.post("/api/sessions/login").send(credentialsMock);

		const cookieResult = loginResult.headers["set-cookie"][0];
		// 'coderCookie=asdasdashgfasdhy76da5dad'
		expect(cookieResult).to.be.ok;

		const cookieResultSplit = cookieResult.split("="); // ['coderCookie', 'asdasdashgfasdhy76da5dad']
		cookie = {
			name: cookieResultSplit[0],
			value: cookieResultSplit[1]
		};

		expect(cookie.name).to.be.ok.and.to.be.eql("coderCookie");
		expect(cookie.value).to.be.ok;
	});

	it("Debemos enviar una cookie en el servicio current y entregar la información del usuario", async () => {
		const { _body } = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]);
    
    const user = _body.payload
    expect(user.email).to.be.eql("ch@coder.com")
	});
});
