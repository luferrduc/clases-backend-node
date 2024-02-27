import usersModel from "./models/users.model.js"

export default class Users {
	constructor() {}
	getAll = async () => {
		const users = await usersModel.find().lean()
		return users
	}
	getOne = async (userParams) => {
		const exists = await usersModel.findOne(userParams).lean()
		return exists
	}

	getById = async (uid) => {
		const user = await usersModel.findById(uid)
		return user
	}
	getByEmail = async (email) => {
		const exists = await usersModel.findOne({ email }).lean()
		return exists
	}

	signInSignOut = async (email) => {
		const lastConnection = new Date().toLocaleString()
		const result = await usersModel.findOneAndUpdate(
			{ email },
			{ last_connection: lastConnection }
		)
		return result
	}
	create = async ({ first_name, last_name, email, age, password }) => {
		const result = await usersModel.create({
			first_name,
			last_name,
			email,
			age,
			password
		})
		return result
	}

	addCartToUser = async (user, cartId) => {
		const email = user.email
		const newUser = await usersModel.findOneAndUpdate(
			{ email },
			{ cart: cartId }
		)
		const userUpdated = await usersModel.findOne({ email }).lean()
		return userUpdated
	}

	deleteCartFromUser = async (email) => {
		const user = await usersModel.findOne({ email }).lean()
		if (user?.cart) {
			delete user?.cart
			usersModel.findOneAndUpdate({ email }, user)
		}
		return user
	}

	updatePassword = async (email, password) => {
		const newUser = await usersModel
			.findOneAndUpdate({ email }, { password })
			.lean()
		return newUser
	}

	changeRole = async (uid, role) => {
		const result = await usersModel.findByIdAndUpdate({ _id: uid }, { role })
		const userUpdated = await usersModel.findById(uid).lean()
		return userUpdated
	}

	uploadDocuments = async (user, documents) => {
		const uid = user._id
		const filter = { _id: uid }

		const update = {
			$addToSet: {
				// Agrega elementos al conjunto sin duplicados
				documents: { $each: documents } // Agrega cada documento en el array
			}
		}
		// Iterar sobre los documentos para actualizar las referencias de los documentos existentes
		for (const doc of documents) {
			// Buscar si el documento ya existe en el arreglo de 'documents'
			const existingDoc = await usersModel.findOne({
				_id: uid,
				"documents.name": doc.name
			})

			// Si el documento ya existe, actualizar su referencia
			if (existingDoc) {
				await usersModel.updateOne(
					{ _id: uid, "documents.name": doc.name },
					{ $set: { "documents.$.reference": doc.reference } }
				)
			}
		}
		// Ejecutar la actualización para agregar nuevos documentos y actualizar referencias
		const result = await usersModel.findOneAndUpdate(filter, update, {
			upsert: true,
			new: true
		})
		const updatedUser = await usersModel.findById(uid)
		return updatedUser
	}
}
