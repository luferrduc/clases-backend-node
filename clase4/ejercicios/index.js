const {UserManager} = require('./managers/UserManager')

const manager = new UserManager('./files/Usuarios.json')

const env = async () => {
    const users = await manager.getUsers()
    console.log(users)

    const user = {
        nombre: "Jorge",
        apellido: "Perez",
        edad: 20,
        curso: "Backend"
    }

    await manager.createUser(user)
    const usersFinal = await manager.getUsers()
    console.log(usersFinal)
}

env()