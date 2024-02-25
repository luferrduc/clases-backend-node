import mongoose from "mongoose";

const userCollection = "users";

const usersSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "carts"
	},
	role: {
		type: String,
		default: "user"
	},
	last_connection: {
		type: String,
		default: new Date().toLocaleString()
	},
	documents: {
		type: [
			{
				name: String,
				reference: String
			}
		],
		default: []
	}
});

usersSchema.pre(["find", "findById", "findOne"], function () {
	this.populate("cart");
});

const usersModel = mongoose.model(userCollection, usersSchema);

export default usersModel;