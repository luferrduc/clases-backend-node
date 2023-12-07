import mongoose from "mongoose"

export default class MongoSingleton {
  
  static #instance

  constructor(){
    mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase27?retryWrites=true&w=majority")
  }

  static getInsance(){
    // Si la instancia de la clase no existe, la creamos
    // caso contrario, deberíamos reutilizar la instancia de la clase
    if(this.#instance){
      console.log("La conexión ya existe")
      return this.#instance
    }
    console.log("La conexión no existe, se crea una nueva")
    this.#instance = new MongoSingleton()
    return this.#instance

  }
}

