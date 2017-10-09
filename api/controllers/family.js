'use strict'
const Family = require('../models/family')
const sendJSONresponse = require('./shared').sendJSONresponse

async function family_create(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let family = new Family(req.body)
        family.restaurantId = restaurantId

        family = await family.save()
        sendJSONresponse(res, 200, family)
    } catch(e) {
        return next(e)
    }
}

async function family_list(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let families = await Family.find({restaurantId: restaurantId})
        sendJSONresponse(res, 200, families)
    } catch(e) {
        return next(e)
    }
}

async function family_update(req, res, next) {
    try {
        const familyId = req.params.familyId

        let family = await Family.findById(familyId)
        family = Object.assign(family, req.body)

        family = await family.save()

        sendJSONresponse(res, 200, family)
    } catch(e) {
        return next(e)
    }
}

async function family_delete(req, res, next) {
    try {
        const familyId = req.params.familyId

        let family = await Family.findByIdAndRemove(familyId)

        sendJSONresponse(res, 204, family)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    family_create,
    family_list,
    family_update,
    family_delete
}