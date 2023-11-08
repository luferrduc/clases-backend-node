import express from 'express'
import handlebars from 'express-handlebars'
import {__dirname } from './utils.js'
import path from 'node:path'

const app = express()
const PORT = 8080

// Configuración de motor de plantillas
// Motor de plantillas a usar
app.engine('.hbs', handlebars.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res)=>{
    const testUser = {
        name: 'Luciano'
    }

    res.render('index', testUser)
})


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})