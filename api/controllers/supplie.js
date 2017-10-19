'use strict'

const Supplie = require('../models/supplie')
const Restaurant = require('../models/restaurant')
const sendJSONresponse = require('./shared').sendJSONresponse

async function supplie_create (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        let supplie = new Supplie({
            restaurant: restaurantId,
            storage: req.body.storage,
            name: req.body.name,
            category: req.body.category,
            quantityAlert: req.body.quantityAlert,
            unit: req.body.unit,
            daysToBuy: req.body.daysToBuy
        })

        if (!supplie.storage) {
            supplie.storage = null
        }

        console.log(supplie)
        supplie = await supplie.save()

        sendJSONresponse(res, 201, supplie)
    } catch(e) {
        return next(e)
    }
}

async function supplie_details (req, res, next) {
    try {
        const supplieId = req.params.supplieId

        let supplie = Supplie.findById(supplieId)

        sendJSONresponse(res, 200, supplie)
    } catch(e) {
        return next(e)
    }
}

async function supplie_list (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        
        let supplies = await Supplie.find({restaurant: restaurantId}).populate('storage')
        supplies = supplies.map(s => {
            s.storage = s.storage && s.storage.name
            console.log(s)
            return s
        })

        sendJSONresponse(res, 200, supplies)
    } catch(e) {
        return next(e)
    }
}

async function supplie_update (req, res, next) {
    try {
        const supplieId = req.params.supplieId

        let supplie = await Supplie.findById(supplieId)

        if (supplie) {
            supplie = Object.assign(supplie, req.body)
            supplie = await supplie.save()

            sendJSONresponse(res, 200, supplie)
        }
    } catch(e) {
        return next(e)
    }
}

async function supplie_delete(req, res, next) {
    try {
        const supplieId = req.params.supplieId

        let supplie = await Supplie.findByIdAndRemove(supplieId)

        sendJSONresponse(res, 200, supplie)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    supplie_create,
    supplie_details,
    supplie_list,
    supplie_update,
    supplie_delete
}