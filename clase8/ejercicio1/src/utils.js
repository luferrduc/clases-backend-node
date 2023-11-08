import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// Parámetros de configuración

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/public/img/pets`)
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({
    storage,
    onError: (err, next) => {
        console.log(err.message)
        next()
    }
})