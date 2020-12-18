const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderDeptSchema = Schema({
    orderId : {
        type : String
    },
    deptId : {
        type : Number,
        default : 1
    },
    modeOfRequest : {
        type : String
    },
    customerId : {
        type : String
    },
    productId : {
        type : String
    },
    status : {
        type : String,
        enum : ['pending','ok']
    },
    agentId : {
        type : String
    },
    reasonsForFailure : []
}, { timestamps: true })

const OrderDeptModel = mongoose.model('OrdersDept', OrderDeptSchema)
module.exports = OrderDeptModel
