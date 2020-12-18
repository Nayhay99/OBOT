const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
    orderId : {
        type : String//uid or _id
    },
    modeOfPayment : {
        type : String,
        enum : ['COD','EMI','Debit/Credit','BHIM_UPI']
    },
    paymentStatus : {
        type : String,
        enum : ['paid','due']
    },
    customerId : {
        type : String
    },
    quantity : {
        type : Number
    },
    deliveryLocation : {
        // object or string
    },
    estimatedDeliveryDate : {
        type : Date
    },
    image : {
        type : String
    }
}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)
module.exports = OrderModel
