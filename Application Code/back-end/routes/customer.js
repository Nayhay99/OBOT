const express = require('express')
const app = express.Router()
const _ = require('lodash')

const Order = require('../models/order')
const Product = require('../models/product')
const OrdersDept = require('../models/ordersDept')
const AssemblyDept = require('../models/assemblyDept')
const ManufacturingDept = require('../models/manufacturingDept')
const LogisticsDept = require('../models/logisticsDept')
const Customer = require('../models/customer')


// GET order status details
app.get('/',async (req, res) => {
    const orderId = req.query.orderId
    const statusChoice = req.query.status

    let response
    const statusCheck = []
    switch(statusChoice) {
        case "os" :
            await OrdersDept.findOne({orderId : orderId},(err,orderStatus) => {statusResponse = orderStatus.status})
            if (statusResponse === "ok") {
                statusCheck.push(1)
                await AssemblyDept.findOne({orderId},(err,assemblyStatus) => { statusResponse = assemblyStatus.status })
                if (statusResponse === "ok") {
                    statusCheck.push(2)
                    await ManufacturingDept.findOne({orderId}, (err,manufacturingStatus) => { statusResponse =  manufacturingStatus.status, estimatedTimeOfOrderDispatch = manufacturingStatus.estimatedTimeOfOrderDispatch })
                    if (statusResponse === "ok") {
                        statusCheck.push(3)
                        await LogisticsDept.findOne({orderId},(err,logisticStatus) => { statusResponse = logisticStatus.status, expectedTimeOfDelivery = logisticStatus.estimatedDeliveryDate, estimatedTimeOfOrderDispatch = logisticStatus.estimatedTimeOfOrderDispatch})
                        if (statusResponse === "ok") {
                            statusCheck.push(4)
                            response = {
                                text : "Your order is on the way."
                            }
                        } else if (statusResponse === "pending") {
                            response = {
                                text : "Your order is dispatched. Soon will arrive at your place."
                            }
                        }
                    } else if (statusResponse === "pending") {
                        response = {
                            text : "Your order product items are assembled. Soon will be dispatched from the manufacturing Department",
                        }
                    }
                }
            } else if (statusResponse === "pending") {
                response = {
                    text : "Your order has been accepted. Soon the proces",
                }
            } else {
                response = {
                    text : "No order found. Check the orderId"
                }
            }
            break
        case "ors" :
            response = {
                text : "Your refund process has been initiated. You can expect the refund in 2-3 working days.",
            }
            break
        case "oc" :
            ManufacturingDept.findOne({orderId}, (status) => {
                if (status === "ok" || status === "pending") {
                    response = {
                        text : "Order is not eligible for cancellation."
                    }
                } else {
                    response = {
                        text : "Order has been accepted for cancellation."}
                }
            })
            break
    }
    if (!response){
        response = "Internal Server Error. Please try again in some time."
    }
    res.send({response,statusCheck})
})

app.get('/orders',async (req, res) => {
    const email = ctx.query.email

    const customer = await Customer.findOne({email},async (err, data) => {
        if (err) {return err}
        return data
    })
    const customerOrders = customer.orders
    const order = await _.forEach(customerOrders,(order) => {
        const res = {
            orderId : order.orderId,
            image : order.image
        }
        return res
    })
    res.send(order)
})

app.get('/products',(req,res) => {
    const productName = req.query.product

    Product.findOne({productName},(err,details) => {
        if (err) {return err}
        res.send(details)
    } )
})

module.exports = app
