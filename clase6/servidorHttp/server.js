import http from 'node:http'

const server = http.createServer((req, res)=>{
    res.end('Mi primer hola mundo desde el backend')

})

const PORT = 8080

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
