import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: '1.0.0',
    title: 'Documentación generada con autogen',
    description: 'Documentación proyecto adopción de mascotas',
  },
  host: 'localhost:8080',
  basePath: '/',
  schemes: ['http'],
  definitions: {
    User: {
      name: 'Coder',
      lasntname: 'House'
    }
  }
}

const outputFile = './swagger-output.json'
const endPointFiles = ['./src/app.js']

swaggerAutogen(outputFile, endPointFiles, doc).then(async () => {
  await import('./src/app.js')
})