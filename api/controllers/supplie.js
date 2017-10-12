'use strict'

const Supplie = require('../models/supplie')
const Restaurant = require('../models/restaurant')
const sendJSONresponse = require('./shared').sendJSONresponse

async function supplie_create (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let supplie = new Supplie(req.body)
        supplie.restaurantId = restaurantId

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

        let supplies = await Supplie.find({restaurantId: restaurantId}).populate('storage')

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