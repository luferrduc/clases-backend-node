import express from 'express'
import handlebars from 'express-handlebars'
import {__dirname } from './utils.js'
import path from 'node:path'
import viewsRouter from './routes/views.routes.js'
import usersRouter from './routes/users.routes.js'


const app = express()
const PORT = 8080

// Configuración de motor de plantillas
// Motor de plantillas a usar
app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/', viewsRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})