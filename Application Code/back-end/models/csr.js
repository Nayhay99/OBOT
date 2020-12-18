const mongoose = require('mongoose')
const Schema = mongoose.Schema

// add password ---remove passwords from agent!
const CsrSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phoneNumber : {
        type : String
    },
    address : {
        type : String
    },
    password : {
        type : String
    }
},{timestamps : true})

const CsrModel = mongoose.model('CSR',CsrSchema)
module.exports = CsrModel