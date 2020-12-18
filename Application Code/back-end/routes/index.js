'use strict'

const express = require('express')
const app = express.Router()


app.get('/',(req,res) => {
  res.send('Testing123')
})

module.exports = app
