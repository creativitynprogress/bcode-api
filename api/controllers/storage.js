'use strict'

const Storage = require('../models/storage')
const sendJSONresponse = require('./shared').sendJSONresponse

async function storage_create(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let storage = new Storage(req.body)
        storage.restaurant = restaurantId
        
        storage = await storage.save()

        sendJSONresponse(res, 201, storage)
    } catch (e) {
        return next(e)
    }
}

async function storage_list(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let storages = await Storage.find({restaurant: restaurantId})

        sendJSONresponse(res, 200, storages)
    } catch(e) {
        return next(e)
    }
}

async function storage_update(req, res, next) {
    try {
        const storageId = req.params.storageId

        let storage = await Storage.findById(storageId)
        storage = Object.assign(storage, req.body)

        sendJSONresponse(res, 200, storage)
    } catch (e) {
        return next(e)
    }
}

async function storage_delete(req, res, next) {
    try {
        const storageId = req.params.storageId

        let storage = await Storage.findByIdAndRemove(storageId)

        sendJSONresponse(res, 204, storage)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    storage_create,
    storage_list,
    storage_update,
    storage_delete
}