import MongoSingleton from "./singleton.js";


const firstInstance = MongoSingleton.getInsance()
const secondInstance = MongoSingleton.getInsance()
const thirdInstance = MongoSingleton.getInsance()


// const userInstance = new User("Alex")
// Todos los usuarios que lleguen
// tendrán los mismos datos de Alex
// si aplicamos singleton