import moment from "moment";

const hoy = moment()
const fechaNacimiento = moment('1994-04-05', 'YYYY-mm-dd')

const edad = hoy.diff(fechaNacimiento, 'years')

console.log(edad)