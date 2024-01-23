// Factory nos permite crear objewtos de manera dinámica dependiendo de una variable
// de ambiente lo que nos hace optimizar los recursos, ya que no creamos objetos de manera innecesaria
import config from '../config/configs.js'

export let Users;
export let Courses;

const PERSISTENCE = config.persistence; // TODO: Variables de ambiente

switch (PERSISTENCE) {
	case "MONGO":
		console.log("Trabajando con persistencia en MongoDB");
		const mongoose = await import("mongoose");
		try {
			await mongoose.connect(config.mongoUrl); // TODO: Variables de ambiente
      const { default: UsersMongo } = await import("./dbManagers/users.manager.js")
      const { default: CoursesMongo } = await import("./dbManagers/courses.manager.js")
      Users = UsersMongo 
      Courses = CoursesMongo
      break
		} catch (error) {
      console.log("Error en la DB")

    }

	case "FILE":
		console.log("Trabajando con persistencia en Archivos");
    // const { default: UsersFile } = await import("./fileManagers/users.manager.js")
    // Users = UsersFile
    break
}
