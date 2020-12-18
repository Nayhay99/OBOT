const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AssemblyDeptSchema = Schema({
    deptId : {
        type : Number,
        default : 2
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
    inventory : {},
    status : {
        type : String,
        enum : ['pending','ok']
    },
    agentId : {
        type : String
    },
    reasonsForFailure : []
}, { timestamps: true })

const AssemblyDeptModel = mongoose.model('AssemblyDept', AssemblyDeptSchema)
module.exports = AssemblyDeptModel
