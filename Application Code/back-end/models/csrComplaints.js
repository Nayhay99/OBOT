const mongoose = require('mongoose')
const Schema = mongoose.Schema

const csrComplaintSchema = new Schema({
    complaintId : {
        type : String,
        unique : true,
        required : true
    },
    count : {
        type : Number,
        default : 0
    },
    complain : {
        type : String
    },
    department : {
        type : String,
        enum : ['orders','assembly','manufacturing','logistics']
    },
    date : {
        type : Date
    }
})

const csrComplaintModel = mongoose.model('csrComplaint',csrComplaintSchema)
module.exports = csrComplaintModel