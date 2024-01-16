import express from "express"
import cluster from "cluster";
import { cpus } from "os";

console.log(cluster.isPrimary);

const numeroNucleos = cpus().length;
console.log(numeroNucleos);

if (cluster.isPrimary) {
	// Responsabildiad: crear procesos workers
	console.log("Soy el proceso primario y mi trabajo es generar workers");
	for (let i = 0; i < numeroNucleos; i++) {
		cluster.fork();
	}
  // Responsabilidad: levantar nuevos procesos workers en caso de que les pase algo
  cluster.on('exit', (worker, code, signal) => {
    console.log(`El trabajador con PID ${worker.process.pid} murió`)
    cluster.fork()
  })

} else {
	console.log(
		"Soy un proceso forkeado y mi trabajo es resolver o ejecutar la aplicación"
	);
	const app = express();

	app.get("/operacionsencilla", (req, res) => {
		let sum = 0;
		for (let i = 0; i < 1000000; i++) {
			sum += i;
		}
		res.send({ message: "Operación sencilla", result: sum });
	});

	app.get("/operacioncompleja", (req, res) => {
		let sum = 0;
		for (let i = 0; i < 5e8; i++) {
			sum += i;
		}
		res.send({ message: "Operación compleja", result: sum });
	});

	app.listen(3030, () => {
		console.log("Server listening on port 3030");
	});
}
