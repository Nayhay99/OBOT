const express = require('express')
const app = express.Router()
const _ = require('lodash')
const faker = require('faker')

const Order = require('../models/order')
const OrdersDept = require('../models/ordersDept')
const AssemblyDept = require('../models/assemblyDept')
const ManufacturingDept = require('../models/manufacturingDept')
const LogisticsDept = require('../models/logisticsDept')
const Complaint = require('../models/csrComplaints')

// get order status
app.get('/',async (req, res) => {
    const orderId = req.query.orderId
    const statusChoice = req.query.status

    let response
    const statusCheck = []
    // send order details as well remove deliveryDate from logistics
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
                                text : "Order has been dispatched. Soon arriving at you place!",
                                expectedTimeOfDelivery
                                // add all fields
                            }
                        } else if (statusResponse === "pending") {
                            response = {
                                text :"Your order product has been manufactured. Soon will be dispatched by the logistics department.",
                                estimatedTimeOfOrderDispatch
                            }
                        }
                    } else if (statusResponse === "pending") {
                        response = {
                            text : "Your order product items are assembled. Soon will be dispatched from the manufacturing Department",
                            estimatedTimeOfOrderDispatch
                        }
                    }
                }
            } else if (statusResponse === "pending") {
                response = {
                    text : "Order has been accepted. Soon the proces",
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

app.get('/complaints',async (req, res) => {
    const complainArray = []
    let mostQueriedComplaints
    const complains = await Complaint.find({},async (complaints) => {
        // date logic
        mostQueriedComplaints = await _.slice(_.orderBy(complaints,(e) => {return e.count},['desc']),[start = 0],end = [5])
        return mostQueriedComplaints
    })
    await _.forEach(complains,(query) => {
        const queryComplain = {
            text : query.complain,
            complaintId : query.complaintId
        }
        complainArray.push(queryComplain)
    })
    complainArray.push({text : "Others",complaintId : "others"})
    res.send(complainArray)
})

app.get('/complaints/counter', async (req, res) => {
    console.log(req.query.complaintId);

    await Complaint.findOne({complaintId : req.query.complaintId},async (err,complain) => {
      await Complaint.update({complaintId:complain.complaintId},{count : complain.count +1},(err,data) => {
        if (err) {return err}
            console.log('Count incremented.')
            res.send('success')
        })
    })
  })

app.post('/complaints',(req, res) => {
    const complaint = new Complaint({
        complaintId : faker.random.uuid(),
        complain : req.query.complain,
        count : 1,
        department : req.query.department,
        date : _.now()
    })
    complaint.save((err,data) => {
        if (err) {return err}
        console.log('Complaint registered')
        res.send('Complain Registered')
    })
})

module.exports = app
