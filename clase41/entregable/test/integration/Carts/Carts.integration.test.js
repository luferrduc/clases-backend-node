import supertest from "supertest"
import { expect } from "chai"

import configs from "../../../src/config.js"

const requester = supertest(`http://localhost:${PORT}`)

const PORT = configs.port

describe("Testing del módulo de Carts", () => {

})