const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    productId : {
        type : String
    },
    productColor : {
        type : String
    },
    productName : {
        type : String
    },
    productPrice : {
        type : String
    },
    unitsAvailable : {
        type : Number
    }
}, { timestamps: true })

const ProductModel = mongoose.model('Product', ProductSchema)
module.exports = ProductModel
