'use strict'

const Supplie = require('../models/supplie')
const Purchase = require('../models/purchase')
const sendJSONresponse = require('./shared').sendJSONresponse

async function purchase_create (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        const supplieId = req.body.supplieId

        if (supplieId) {
            let supplie = await Supplie.findById(supplieId)

            supplie.quantity += req.body.quantity
            let total = (supplie.quantity * supplie.value) + req.body.total

            supplie.value = total / supplie.quantity
            await supplie.save()

            let purchase = new Purchase(req.body)
            purchase = await purchase.save()

            sendJSONresponse(res, 201, purchase)
        } else {
            return next(new Error('supplieId is required'))
        }

    } catch (e) {
        return next(e)
    }
}

async function purchase_list (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let purchases = await Purchase.find({restaurant: restaurantId})

        sendJSONresponse(res, 200, purchases)
    } catch (e) {
        return next(e)
    }
}

async function purchase_details (req, res, next) {
    try {
        const purchaseId = req.params.purchaseId

        let purchase = await Purchase.findById(purchaseId).populate('restaurant')
        sendJSONresponse(res, 200, purchase)
    } catch (e) {
        return next(e)
    }
}

async function purchase_delete (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        const purchaseId = req.params.purchaseId

        let purchase = await Purchase.findById(purchaseId)
        let supplie = await Supplie.findById(purchase.supplie)


        if (supplie) {
            supplie.quantity -= purchase.quantity
            let total = (supplie.value * supplie.quantity) - purchase.total

            supplie.value = total / supplie.quantity

            await supplie.save()
            purchase = await purchase.save()

            sendJSONresponse(res, 203, purchase)
        } else  {
            return next(new Error('supplie not found'))
        }
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    purchase_create,
    purchase_list,
    purchase_details,
    purchase_delete
}