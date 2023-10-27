
import { cartsModel } from "./models/carts.model.js";

export default class Carts {
    constructor(){

    }

    getAll = async () => {
        const carts = await cartsModel.find()

        return carts
    }

    getById = async (id) => {
        const cart = await cartsModel.findById({ _id: id })
        return cart
    }

    create = async () => {
        const result = cartsModel.create()
        return result
    }

    addProduct = async (cid, pid) => {
        
        const cart = cartsModel.findById({ _id: cid })
        const product = cart.products.find(prod=> prod.id === pid)
        if(product){
            cart.products.push({...product, quantity: quantity+1 })
        }else{
            cart.products.push({id: pid, quantity: 1 })
        }
        cartsModel.updateOne({ _id: cid }, cart)

        return cart
    }

}