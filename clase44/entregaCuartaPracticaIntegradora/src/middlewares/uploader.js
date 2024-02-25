import multer from "multer";
import { __dirname } from "../utils.js";

// TODO: Crear un middleware con multer que permita guardar en diferentes carpetas los diferentes archivos
// TODO: Modificar la función para que dependiendo del archivo lo guarde en una carpeta u otra



let folder = `${__dirname}/../public/assets`

const destinations = {
	profile: cb(null, `${folder}/profiles`),
	products: cb(null, `${folder}/products`),
	identificacion: cb(null, `${folder}/documents`),
	domicilio: cb(null, `${folder}/documents`),
	cuenta: cb(null, `${folder}/documents`),
}

const storage = multer.diskStorage({
	/*
	 * Imagen de perfil -> /profiles
	 * Imagen de producto -> /products
	 * Un documento -> /documents //? (Identificación, Comprobante de domicilio, Comprobante de estado de cuenta)
	 */
	destination: function (req, file, cb) {
    //* Identificar cuando es un tipo de archivo perfil, producto o documento

		destinations[file.fieldname]
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const uploader = multer({ storage });

export default uploader;
