import { Router } from "express";
import Students from "../dao/dbManagers/students.manager.js";

const router = Router();
const studentsManager = new Students();
router
  .get("/", async (req, res) => {
    try {
      const students = await studentsManager.getAll();
      return res.send({ status: "success", payload: students });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  })
  .post("/", async (req, res) => {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        dni,
        email,
        birth_date: birthDate,
        gender,
      } = req.body;
      if (!firstName || !lastName || !email)
        return res
          .status(400)
          .send({ status: "error", message: "incomplete values" });

      const student = {
        first_name: firstName,
        last_name: lastName,
        email,
        dni,
        birth_date: birthDate,
        gender,
      };
      const result = await studentsManager.save(student);
      return res.status(201).send({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  });

export default router;
