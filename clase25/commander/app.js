import { Command } from "commander";

const program = new Command()

program.option('-d', 'variable para debug', true)
       .option('-p <port>', 'variable para setear el puerto del servidor', 8080)
       .requiredOption('-u <user>', 'usuario del sistema')
       .option('--mode <mode>', 'modo de trabajo', 'develop') // node app.js -p 8090 -d -u luciano --mode test 
       .option('--letters [letters...]', 'recibimos letters') // node app.js -p 8090 -d -u luciano --mode test --letters a b c d e 
       
program.parse()

console.log('Options', program.opts())