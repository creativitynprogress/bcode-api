const PurchaseOrder = require('../models/purchase_order')
const Supplie = require('../models/supplie')
const sendJSONresponse = require('./shared').sendJSONresponse

async function purchase_order_create (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let purchase_order = new PurchaseOrder(req.body)
        purchase_order.restaurant = restaurantId

        purchase_order = await purchase_order.save()

        sendJSONresponse(res, 201, purchase_order)
    } catch (e) {
        return next(e)
    }
}

async function purchase_order_list (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let purchase_orders = await PurchaseOrder.find({restaurant: restaurantId}).populate('supplie')

        sendJSONresponse(res, 200, purchase_orders)
    } catch(e) {
        return next(e)
    }
}

async function purchase_order_delete (req, res, next) {
    try {
        const purchaseOrderId = req.params.purchaseOrderId

        let purchase_order = await PurchaseOrder.findByIdAndRemove(purchaseOrderId)

        sendJSONresponse(res, 203, purchase_order)
    } catch(e) {
        return next(e)
    }
}

async function purchase_order_update (req, res, next) {
    try {
        const purchaseOrderId = req.params.purchaseOrderId

        let purchase_order = await PurchaseOrder.findById(purchaseOrderId)

        purchase_order = Object.assign(purchase_order, req.body)

        purchase_order = await purchase_order.save()

        sendJSONresponse(res, 200, purchase_order)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    purchase_order_create,
    purchase_order_list,
    purchase_order_delete,
    purchase_order_update
}