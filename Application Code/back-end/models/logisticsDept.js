const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogisticsDeptSchema = Schema({
    deptId : {
        type : Number,
        default : 4
    },
    actualTimeOfArrival : {
        type : Date
    },
    actualTimeOfDispatch : {
        type : Date
    },
    estimatedTimeOfOrderArrival : {
        type : Date
    },
    estimatedTimeOfOrderDispatch : {
        type : Date
    },
    estimatedDeliveryDate : {
        type : Date
    },
    deliveryAgentId : {
        type : String
    },
    orderId : {
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

const LogisticsDeptModel = mongoose.model('LogisticsDept', LogisticsDeptSchema)
module.exports = LogisticsDeptModel
