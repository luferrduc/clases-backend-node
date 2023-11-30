import { config } from "dotenv";
import { Command } from "commander"

const program = new Command()
program.option("--mode <mode>", "variable de ambiente de desarrollo", "")
program.parse()

// DEVELOPMENT, PRODUCTION
const environment = program.opts().mode

config({
  path: (environment === 'DEVELOPMENT') ? './.env.development' : './.env.production',

})

const configs = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL
}

export default configs