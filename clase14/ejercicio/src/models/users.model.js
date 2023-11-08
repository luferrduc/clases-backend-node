import mongoose from "mongoose"

// Espesificar el nombre de la colección
const userCollection = "users"

// Definir el schema de nuestro documento (atributos)
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
})

// Parte funcional de nuestro modelo, es la parte para
// poder interactuar con la BD 
export const usersModel = mongoose.model(userCollection, userSchema)