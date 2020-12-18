const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManufacturingDeptSchema = Schema({
    deptId : {
        type : Number,
        default : 3
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

const ManufacturingDeptModel = mongoose.model('ManufacturingDept', ManufacturingDeptSchema)
module.exports = ManufacturingDeptModel
