import winston from "winston";
import configs from "../config.js";
// Ejercicio multientorno
const ENVIRONMENT = configs.environment;
console.log(ENVIRONMENT)
let logger;

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5
	},
	colors: {
		fatal: "red",
		error: "magenta",
		warning: "yellow",
		info: "green",
		http: "cyan",
		debug: "blue"
	}
};

if (ENVIRONMENT == "PROD") {
	// prodLogger
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: "info",
				format: winston.format.combine(
					winston.format.colorize({
						all: true,
						colors: customLevelOptions.colors
					}),
					winston.format.simple()
				)
			}),
			new winston.transports.File({
				filename: "logs/errors.log",
				level: "error"
			})
		]
	});
} else {
	// devLogger
	logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: "debug",
				format: winston.format.combine(
					winston.format.colorize({
						all: true,
						colors: customLevelOptions.colors
					}),
					winston.format.simple()
				)
			})
		]
	});
}

// crear nuestro logger, donde vamos a definir nuestro transporte
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console({
//       level: 'info'
//     }),
//     new winston.transports.File({
//       filename: 'logs/dev.log',
//       level: 'warn'
//     })
//   ]
// })

// const logger = winston.createLogger({
// 	levels: customLevelOptions.levels,
// 	transports: [
// 		new winston.transports.Console({
// 			level: "debug",
//       format: winston.format.combine(
//         winston.format.colorize({
//           all: true,
//           colors: customLevelOptions.colors
//         }),
//         winston.format.simple()
//       )
// 		})
// 	]
// });

export const addLogger = (req, res, next) => {
	req.logger = logger;
	req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
	next();
};
