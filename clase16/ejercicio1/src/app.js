import mongoose from "mongoose"
import usersInfo from './Users.json' assert { type: 'json' }
import {usersModel} from "./models/users.model.js"
import { studentsModel } from "./models/students.model.js"
import { coursesModel } from "./models/courses.model.js"

const environment = async () => {
    try {
        await mongoose.connect("mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase16?retryWrites=true&w=majority")
        // Insertar la data de prueba
        // const responseInsert = await usersModel.insertMany(usersInfo)
        // console.log(responseInsert)
        // const usersByNameStats = await usersModel.find({first_name: "Jose", last_name: "Guerra"}).explain('executionStats')
        // console.log(usersByNameStats)

        // await coursesModel.insertMany([{
        //     title: "Progamación Backend",
        //     description: "Programación Backend con NodeJS",
        //     teacher: "Alex Pinaida"
        // },
        // {
        //     title: "Progamación Frontend",
        //     description: "Programación Frontend con React",
        //     teacher: "Juan Gómez"
        // }])

        // await studentsModel.create({
        //     first_name: "John",
        //     last_name: "Doe",
        //     email: "john.doe@gmail.com",
        //     gender: "M"
        // })

        // Asociar el curso con el estudiante

        // const student = await studentsModel.findOne({ _id:'6539ba56c05619d55eeec3b2' })
        // console.log(student)
        // student.courses.push({ course: '6539b9ec065170a72b046090' })

        // await studentsModel.updateOne({_id: '6539ba56c05619d55eeec3b2' }, student)
        // console.log(student)

        // const students = await studentsModel.find().populate("courses.course")
        // console.log(JSON.stringify(students, null, '\t'))
        const students = await studentsModel.find()
        console.log(JSON.stringify(students, null, '\t'))


    } catch (error) {
        console.log(error.message)
    }
}

environment() 