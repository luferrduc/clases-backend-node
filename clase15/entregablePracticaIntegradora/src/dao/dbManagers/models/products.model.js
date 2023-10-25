import mongoose from "mongoose"

const productsCollection = 'products'
const productsSchema = new mongoose.Schema({
    id: {
        type: UUID,
        required: true,
        immutable: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    thumbnail: {
        type: [String],
        default: []
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 5,
        maxLength: 12,
        lowercase: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    }
})

export const productsModel = mongoose.model(productsCollection, productsSchema)