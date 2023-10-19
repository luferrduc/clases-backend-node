import { Router } from "express";
import { usersModel } from "../models/users.model.js";

const router = Router();

router
  .get("/", async (req, res) => {
    try {
      const users = await usersModel.find();
      return res.send({ status: "success", payload: users });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ error: error.message });
    }
  })
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
