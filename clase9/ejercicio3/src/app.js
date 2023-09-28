import express from 'express'
import handlebars from 'express-handlebars'
import {__dirname } from './utils.js'
import path from 'node:path'
import viewsRouter from './routes/views.routes.js'


const app = express()
const PORT = 8080

// Configuración de motor de plantillas
// Motor de plantillas a usar
app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
// const food = [
//     {
//         name: "Pizza",
//         price: 100
//     },
//     {
//         name: "Soda",
//         price: 30
//     },
//     {
//         name: "Banana",
//         price: 15
//     },
//     {
//         name: "Ensalada",
//         price: 8
//     },
//     {
//         name: "Fruta",
//         price: 60
//     },
// ]

// app.get('/', (req, res)=>{
//     const testUser = {
//         name: 'Luciano',
//         role: 'admin'
//     }

//     const testUser2 = {
//         name: 'José',
//         role: 'User'
//     }

//     res.render('food', {
//         user: testUser,
//         isAdmin: testUser.role === 'admin',
//         food
//     })
// })

app.use('/', viewsRouter)


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})