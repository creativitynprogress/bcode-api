'use strict'
const Ticket = require('../models/ticket')
const Pay = require('../models/pay')
const Order = require('../models/order')
const sendJSONresponse = require('./shared').sendJSONresponse

async function ticket_create(req, res, next) {
    try {
        const employeeId = req.user._id
        const restaurantId = req.params.restaurantId

        let ticket = new Ticket({
            restaurant: restaurantId,
            employee: employeeId,
            orders: req.body.orders
        })

        let total = 0

        let orders = await Order.find({_id: {$in: ticket.orders}}).populate('product')

        orders.forEach(orderId => {
            total += order.product.salePrice
        })

        ticket.total = total
        ticket = await ticket.save()

        sendJSONresponse(res, 201, ticket)

    } catch (e) {
        return next(e)
    }
}

async function ticket_list_employee(req, res, next) {
    try {
        const employeeId = req.user
        const state = req.params.state || ''

        if (state) {
            let tickets = await Ticket.find({
                employeeId: employeeId,
                state: state
            }).populate('pays')
        } else {
            let tickets = await Ticket.find({
                employeeId: employeeId
            }).populate('pays')
        }

        sendJSONresponse(res, 200, tickets)

    } catch (e) {
        return next(e)
    }
}

async function ticket_list_restaurant(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        const state = req.params.state || ''

        if (state) {
            let tickets = await Ticket.find({
                restaurant: restaurantId,
                state: state
            }).populate('pays')
        } else {
            let tickets = await Ticket.find({
                restaurant: restaurantId
            }).populate('pays')
        }

        sendJSONresponse(res, 200, tickets)
    } catch (e) {
        return next(e)
    }
}

async function ticket_delete(req, res, next) {
    try {
        let ticketId = req.params.ticketId

        let ticket = await Ticket.findByIdAndRemove(ticketId)

        sendJSONresponse(res, 203, ticket)
    } catch (e) {
        return next(e)
    }
}

async function ticket_add_pay(req, res, next) {
    try {
        let ticketId = req.params.ticketId

        let ticket = await Ticket.findById(ticketId).populate('pays')

        let pay = new Pay({
            quantity: req.body.quantity,
            tip: req.body.tip,
            bank: {
                card: req.body.cardId
            }
        })

        pay = await pay.save()

        ticket.pays.push(pay._id)

        let total = 0
        ticket.pays.foreach(pay => {
            total += pay.quantity
        })

        if (total >= ticket.total) {
            ticket.state = 'paid'
        }

        sendJSONresponse(res, 201, ticket)

    } catch (e) {
        return next(e)
    }
}

async function ticket_delete_pay(req, res, next) {
    try {
        const ticketId = req.params.ticketId
        const payId = req.params.payId

        let ticket = Ticket.findById(ticket).populate('pays')

        if (ticket) {
            await ticket.pays.id(payId).remove()
            await Pay.findByIdAndRemove(payId)
        }

        let total = 0
        ticket.pays.forEach(pay => {
            total += pay.quantity
        })

        if (total >= ticket.total) {
            ticket.state = 'paid'
        } else {
            ticket.state = 'open'
        }

        sendJSONresponse(res, 203, ticket)

    } catch (e) {
        return next(e)
    }
}

async function ticket_cancel (req, res, next) {
    try {
        const ticketId = req.params.ticketId

        let ticket = Ticket.findById(ticketId)
        ticket.state = 'cancelled'

        ticket = await ticket.save()

        sendJSONresponse(res, 200, ticket)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    ticket_create, 
    ticket_delete,
    ticket_list_employee,
    ticket_list_restaurant,
    ticket_add_pay,
    ticket_delete_pay,
    ticket_cancel
}