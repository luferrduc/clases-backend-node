import Router from "./router.js";
import Students from "../dao/dbManagers/students.manager.js";
import Courses from "../dao/dbManagers/courses.manager.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";





export default class ViewsRouter extends Router {
	constructor() {
		super();
		this.studentsManager = new Students();
        this.coursesManager = new Courses()
	}

	init() {
		this.get(
			"/students-view",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.studentsView
		);
		this.get(
			"/courses-view",
			[accessRolesEnum.PUBLIC],
			passportStrategiesEnum.NOTHING,
			this.coursesView
		);
	}

	studentsView = async (req, res) => {
        try {
            const students = this.studentsManager.getAll()
            return res.render('students', { students })
        } catch (error) {
             return res.sendServerError(error.message);
        }
	};

	coursesView = async (req, res) => {
        try {
            const courses = this.coursesManager.getAll()
            return res.render('courses', { courses })
        } catch (error) {
             return res.sendServerError(error.message);
        }
	};
}

