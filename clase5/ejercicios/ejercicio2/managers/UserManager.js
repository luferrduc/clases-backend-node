import fs from 'node:fs'
import crypto from 'node:crypto'

export default class UserManager {
    constructor(path){
        this.path = path
    }

    getUsers = async () => {
        try {
            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const users = JSON.parse(data)
                return users
            }else{
                return [];
            }
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (usuario) => {
        try {
            // Obtener todos los usuarios
            const users = await this.getUsers()
            if(!users.length){
                usuario.id = 1;
            }else{
                usuario.id = users[users.length - 1].id + 1 
            }

            usuario.salt = crypto.randomBytes(128).toString('base64')
            usuario.password = crypto.createHmac('sha256', usuario.salt)
            .update(usuario.password).digest('hex')


            users.push(usuario)

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))
            return usuario

        } catch (error) {
            console.log(error)
        }
    }

    validateUser = async (username, password) => {
        try {
            const users = await this.getUsers()
            const user = users.find(user => user.usuario === username)
            if(!user){
                console.log('Usuario no encontrado')
                return
            }

            const newHash = crypto.createHmac('sha256', user.salt)
            .update(password).digest('hex')

            if(newHash === user.password){
                console.log('Usuario logueado')
            }else{
                console.log('Password incorrecta')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

