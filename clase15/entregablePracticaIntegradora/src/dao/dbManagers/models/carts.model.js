import mongoose from "mongoose"


const cartsCollection = "carts"

const productsCartsSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.UUID,
        required: true,
        immutable: true
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    }
})

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            productsCartsSchema
        ],
        default: []
    }
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)