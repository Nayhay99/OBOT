const config = require('config')

startServer = (app, ipAddress, port) => {
    const http = require('http')
    const httpServer = http.createServer(app)

    return httpServer.listen(port, ipAddress, () => {
        console.log('\033[1m' + 'HTTP server is running at ' + ipAddress + ':' + port + '\033[m')
    })
}

runApp = () => {
    const app = require('./app')
    const ipAddress = '0.0.0.0'
    const port = 3344

    startServer(app, ipAddress, port)
}

runApp()