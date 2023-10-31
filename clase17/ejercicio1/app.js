import { connect } from "mongoose"
import ordersModel from "./models/orders.model.js"



const environment = async () => {

    try {
        await connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase17?retryWrites=true&w=majority")
        console.log("Database connected")

        // const orders = [
        //     {
        //         name: "Pepperoni", size: "medium", price: 19,
        //         quantity: 10, date: "2021-03-13T08:14:30Z"
        //     },
        //     {
        //         name: "Pepperoni", size: "medium", price: 20,
        //         quantity: 20, date: "2021-03-13T09:13:24Z"
        //     },
        //     {
        //         name: "Pepperoni", size: "large", price: 21,
        //         quantity: 30, date: "2021-03-17T09:22:12Z"
        //     },
        //     {
        //         name: "Cheese", size: "small", price: 12,
        //         quantity: 15, date: "2021-03-13T11:21:39.736Z"
        //     },
        //     {
        //         name: "Cheese", size: "medium", price: 13,
        //         quantity: 50, date: "2022-01-12T21:23:13.331Z"
        //     },
        //     {
        //         name: "Cheese", size: "large", price: 14,
        //         quantity: 10, date: "2022-01-12T05:08:13Z"
        //     },
        //     {
        //         name: "Vegan", size: "small", price: 17,
        //         quantity: 10, date: "2021-01-13T05:08:13Z"
        //     },
        //     {
        //         name: "Vegan", size: "medium", price: 18,
        //         quantity: 10, date: "2021-01-13T05:10:13Z"
        //     }
        // ];
        
        // const resultInsert = await ordersModel.insertMany(orders)
        const ordersResult = await ordersModel.find()
        // console.log(ordersResult)

        // Definir agregación
        const orders = await ordersModel.aggregate([
            // Va a contener los stages de nuestro pipeline
            // Definir el primer stage
            // Filtrar las pizzas que sean "medium"
            {
                $match: { size: "medium" }
            },
            // El resultado del stage anterior es la data para entrada del siguiente stage
            // Agrupar las pizzas por sabor para corroborar cuantos ejemplares se
            // vendieron de dichos sabores
            {
                $group: { _id: "$name", totalQuantity: {$sum: "$quantity" }}
            },
            // Ordenar documentos de acuerdo al atributo totalQuantity
            {
                $sort: { totalQuantity: -1 }
            },
            // Agrupar nuestros documentos para tener todos los registros en 1 arreglo
            // para posteriormente cuando generemos el nuevo documento no se guarden
            // por separado
            // ROOT: accedo a todas las propiedades de nuestro objeto
            {
                $group: { _id: 1, orders: { $push: "$$ROOT" }} 
            },
            // Aplicar una proyección donde vamos a generar un nuevo documento con un 
            // nuevo ObjectId
            {
                $project: {
                    "_id": 0, // Estamos especificando que va a generar un ObjectId automatico
                    orders: "$orders"
                }
            },
            // Generar nuestra nueva colección llamada reportes
            {
                $merge: {
                    into: "reports"
                }
            }
        ])
        console.log(orders)
    } catch (error) {
        console.log(error)
    }
}

environment()