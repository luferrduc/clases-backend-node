import mongoose from "mongoose"


const cartsCollection = "carts"

const productsCartsSchema = new mongoose.Schema({
    id: {
        type: UUID,
        required: true,
        immutable: true
    },
    quantity: {
        type: Number,
        min: 1,
        required:true,
        default: 1
    }
})

const cartsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        immutable: true
    },
    products: {
        type: [
            productsCartsSchema
        ],
        default: []
    }
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)