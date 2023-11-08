import { Router } from "express";
import Courses from "../dao/dbManagers/courses.manager.js";

const router = Router();
const coursesManager = new Courses();
router
  .get("/", async (req, res) => {
    try {
      const courses = await coursesManager.getAll();
      return res.send({ status: "success", payload: courses });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  })
  .post("/", async (req, res) => {
    try {
      const { title, description, teacher } = req.body;
      if (!title || !description || !teacher)
        return res
          .status(400)
          .send({ status: "error", message: "incomplete values" });
      const course = { title, description, teacher };
      const result = await coursesManager.save(course);
      return res.status(201).send({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const { title, description, teacher } = req.body;
      const { id } = req.params;
      if (!title || !description || !teacher)
        return res
          .status(400)
          .send({ status: "error", message: "incomplete values" });
      const course = { title, description, teacher };
      const result = await coursesManager.update(id, course);
      return res.send({ status: "success", payload: result });
    } catch (error) {
      return res.status(500).send({ status: "error", message: error.message });
    }
  });
//   .get()
//   .delete();

export default router;
