import mongoose from 'mongoose'

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String
    },
    email: String,
    gender: String
})

// usersSchema.index({first_name: 1, last_name: 1 })
// usersSchema.index({last_name: 'text'}) --> Indice para busqueda por texto
 
// usersSchema.index({coordinates: '2d' })  --> Indice para busqueda por coordenadas 

export const usersModel = mongoose.model(usersCollection, usersSchema)