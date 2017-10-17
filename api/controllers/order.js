'use strict'

module.exports = (io) => {

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
    
            io.sockets.emit('orders', {
                type: 1,
                order: order
            })
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
    
            io.sockets.emit('orders', {
                type: 4,
                order: order
            })
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
    
            io.sockets.emit('orders', {
                type: 3,
                order: order
            })
            sendJSONresponse(res, 200, order)
        } catch(e) {
            return next(e)
        }
    }
    
    async function order_change_state(req, res, next) {
        try {
            const orderId = req.params.orderId
    
            let order = await Order.findById(orderId)
    
            if (order.state == 'Process') {
                order.state = 'Complete'
            }
    
            order = await order.save()
    
            io.sockets.emit('orders', {
                type: 2,
                order: order
            })
            sendJSONresponse(res, 200, order)
        } catch (e) {
            return next(e)
        }
    }

    return {
        order_create,
        order_delete,
        order_update,
        order_change_state
    }
    
}