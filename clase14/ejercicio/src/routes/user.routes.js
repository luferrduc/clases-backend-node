import { Router } from "express";
import { usersModel } from "../models/users.model.js";

const router = Router();

router
  // READ
  .get("/", async (req, res) => {
    try {
      const users = await usersModel.find();
      return res.send({ status: "success", payload: users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })

  .get("/by-filters", async (req, res) => {
    try {
      const { name, lastName, email } = req.query;
      const users = await usersModel.find({
        $or: [{ first_name: name }, { last_name: lastName }, { email: email }],
      });
      return res.send({ status: "success", payload: users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
  .get("/paginated", async (req, res) => {
    try {
      const { size = 10, page = 0 } = req.query;
      const skip = page * size;
      const users = await usersModel.find().skip(skip).limit(size);
      return res.send({ status: "success", payload: users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
  .get("/by-email", async (req, res) => {
    try {
      const { email } = req.query;
      // [a-zA-Z]
      const users = await usersModel.find({email: {$regex: new RegExp(email, "i")}}, { first_name: 1, email: 1, _id: 0 }).sort({first_name: 1});

      return res.send({ status: "success", payload: users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
  .get("/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const user = await usersModel.findOne({ _id: uid });
      if (!user)
        return res
          .status(404)
          .send({ status: "error", message: "User not found" });
      return res.send({ status: "success", payload: user });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })

  // CREATE
  .post("/", async (req, res) => {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    try {
      const result = await usersModel.create({
        first_name,
        last_name,
        email,
      });

      return res.send({ status: "success", payload: result });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
  // UPDATE
  .put("/:uid", async (req, res) => {
    const { uid } = req.params;
    const userToReplace = req.body;

    const { first_name, last_name, email } = userToReplace;
    if (!first_name || !last_name || !email)
      return res
        .status(400)
        .send({ status: "error", message: "Incomplete values" });

    try {
      const result = await usersModel.updateOne({ _id: uid }, userToReplace);
      return res.send({ status: "success", payload: result });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
  // DELETE
  .delete("/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
      const result = await usersModel.deleteOne({ _id: uid });
      return res.send({ status: "success", payload: result });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  });

export default router;
