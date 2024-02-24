import multer from "multer";
import { __dirname } from "../utils.js";

// TODO: Crear un middleware con multer que permita guardar en diferentes carpetas los diferentes archivos
// TODO: Modificar la función para que dependiendo del archivo lo guarde en una carpeta u otra
let directory;
const storage = multer.diskStorage({
	/*
	 * Imagen de perfil -> /profiles
	 * Imagen de producto -> /products
	 * Un documento -> /documents //? (Identificación, Comprobante de domicilio, Comprobante de estado de cuenta)
	 */
	destination: function (req, file, cb) {
    //* Identificar cuando es un tipo de documento perfil, producto o documento
		cb(null, `${__dirname}/../public/img`);
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const uploader = multer({ storage });

export default uploader;
