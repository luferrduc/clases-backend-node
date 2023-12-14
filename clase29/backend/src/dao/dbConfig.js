import mongoose from "mongoose";
import config from "../config/config.js"


try {
  await mongoose.connect(config.mongoUrl) 
  console.log("Database connected")
} catch (error) {
  console.log(error.message)
  mongoose.disconnect()
}
