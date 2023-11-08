import { Router } from "express";
import Students from "../dao/dbManagers/students.manager.js";
import Courses from "../dao/dbManagers/courses.manager.js";

const router = Router();

const studentsManager = new Students();
const coursesManager = new Courses();

router.get("/students-view", async (req, res) => {
    try {
        const students = studentsManager.getAll()
        return res.render('students', { students })
    } catch (error) {
        console.log(error.message)
    }
})
.get("/courses-view", async(req, res)=>{
    try {
        const courses = coursesManager.getAll()
        return res.render('courses', { courses })
    } catch (error) {
        console.log(error.message)
    }
});

export default router