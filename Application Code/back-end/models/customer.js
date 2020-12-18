const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    customerName : {
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
    orders : []
})

const CustomerModel = mongoose.model('Customer',CustomerSchema)
module.exports = CustomerModel