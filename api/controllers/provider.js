'use strict'
const Provider = require('../models/provider')
const sendJSONresponse = require('./shared').sendJSONresponse

async function provider_create (req, res, next) {
    try {
        const owner = req.user

        let provider = new Provider(req.body)
        provider.owner = owner._id

        let provider = await provider.save()

        sendJSONresponse(res, 201, provider)
    } catch (e) {
        return next(e)
    }
}

async function provider_list (req, res, next) {
    try {
        const owner = req.user

        let providers = await Provider.find({owner: owner._id})

        sendJSONresponse(res, 200, providers)
    } catch (e) {
        return next(e)
    }
}

async function provider_details (req, res, next) {
    try {
        const providerId = req.params.providerId

        let provider = await Provider.findById(providerId).populate('owner')

        sendJSONresponse(res, 200, provider)
    } catch (e) {
        return next(e)
    }
}

async function provider_update (req, res, next) {
    try {
        const providerId = req.params.providerId

        let provider = await Provider.findById(providerId)

        if (provider) {
            provider = Object.assign(provider, req.body)
            sendJSONresponse(res, 200, provider)
        } else {
            return next(new Error('provider not found'))
        }
    } catch (e) {
        return next(e)
    }
}

async function provider_delete (req, res, next) {
    try {
        const providerId = req.params.providerId

        let provider = Provider.findByIdAndRemove(providerId)

        sendJSONresponse(res, 203, provider)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    provider_create,
    provider_details,
    provider_list,
    provider_update,
    provider_delete
}
