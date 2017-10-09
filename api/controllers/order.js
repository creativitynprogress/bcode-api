'use strict'

const Order = require('../models/order')
const Table = require('../models/table')
const sendJSONresponse = require('./shared').sendJSONresponse

async function order_create(req, res, next) {
    try {
        
        const tableId = req.params.tableId

        let table = await Table.findById(tableId)

        let order = new Order({
        	product: req.body.productId,
        	comment: req.body.comment,
        	state: req.body.state,
        	ingredientsRemove: req.body.ingredientsRemove
        })

        table.orders.push(order._id)
		await table.save()

        sendJSONresponse(res, 201, order)
        
    } catch (e) {
        return next(e)
    }
}

async function order_delete(req, res, next) {
    try {
        const tableId = req.params.tableId
        const orderId = req.params.orderId

        let table = await Table.findById(tableId)

        await table.orders.id(orderId).remove()
        let order = await Order.findByIdAndRemove(orderId)

        sendJSONresponse(res, 203, order)
    } catch (e) {
        return next(e)
    }
}

async function order_update(req, res, next) {
    try {
        const orderId = req.params.orderId

        let order = await Order.findById(orderId)

        order = Object.assign(order, req.body)

        order = await order.save()

        sendJSONresponse(res, 200, order)
    } catch(e) {
        return next(e)
    }
}

async function order_change_state(req, res, next) {
    try {
        const orderId = req.params.orderId

        let order = await Order.findById(orderId)

        if (order.state == 'Pending') {
            order.state = 'Process'
        } else if (order.state == 'Process') {
            order.state = 'Complete'
        }

        let order = await order.save()

        sendJSONresponse(res, 200, order)
    } catch (e) {
        return next(e)
    }
}



module.exports = {
    order_create,
    order_delete,
    order_update,
    order_change_state
}