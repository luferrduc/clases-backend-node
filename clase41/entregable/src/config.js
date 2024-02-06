import { config } from "dotenv"
import { Command } from "commander" 
import { __dirname } from "./utils.js"
import { join } from "node:path"


const program = new Command()
program.option("--mode <mode>", "variable de ambiente de desarrollo", "DEV")
program.parse()

// DEVELOPMENT = DEV, PRODUCTION = PROD
const environment = program.opts().mode

const envFileConfig = {
  DEV: './.env.development',
  PROD: './.env.production',
  TEST: './.env.test'
}


config({
  // path: (environment === 'DEV') ? `./.env.development` : `./.env.production`,
  path: envFileConfig[environment]

})

const configs = {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  persistence: process.env.PERSISTENCE || 'MONGO',
  privateKeyJWT: process.env.PRIVATE_KEY_JWT,
  userNodeMailer: process.env.USER_NODEMAILER,
  passwordNodeMailer: process.env.PASSWORD_NODEMAILER,
  environment
}
export default configs