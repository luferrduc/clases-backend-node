import UserManager from "./managers/UserManager.js"

const manager = new UserManager('./files/Usuarios.json')

const env = async () => {
    const users = await manager.getUsers()
    console.log(users)

    // const user = {
    //     nombre: "Jorge",
    //     apellido: "Perez",
    //     usuario: "jperez",
    //     edad: 20,
    //     password: '1234'
    // }

    // await manager.createUser(user)
    const usersFinal = await manager.getUsers()
    console.log(usersFinal)

    await manager.validateUser('jperez', '1234' )
}

env()