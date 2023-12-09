import { config } from "dotenv"
import { Command } from "commander" 
import { __dirname } from "./utils.js"
import { join } from "node:path"


const program = new Command()
program.option("--mode <mode>", "variable de ambiente de desarrollo", "DEV")
program.parse()

// DEVELOPMENT, PRODUCTION
const environment = program.opts().mode
// console.log(`..${__dirname}/.env.development`)
config({
  path: (environment === 'DEV') ? `./.env.development` : `./.env.production`,

})

// console.log("PORT",process.env)

const configs = {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL
}
export default configs