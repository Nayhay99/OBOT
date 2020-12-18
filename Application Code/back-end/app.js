console.log('Starting Environment : 3344')

const config = require('config')

const express = require('express')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express()

const db = require('./helpers/db')
const __ = require('./helpers/response')

const index = require('./routes/index')
const customer = require('./routes/customer')
const csr = require('./routes/customer-representatives')

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            timestamp: true
        })
    ]
}))

db.connectMongo()

const corsOptions = {
    origin: config.get('corsAllowedDomains')
}

app.use(cors(corsOptions))
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/customer', customer)
app.use('/csr', csr)

// catch 404 and render not found page
app.use((req, res, next) => {
    __.notFound(res, 'Wrong page URL')
})

module.exports = app