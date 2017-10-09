'use strict'
const Card = require('../models/card')
const sendJSONresponse = require('./shared').sendJSONresponse

async function card_create (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let card = new Card({
            name: req.body.name,
            commission: req.body.commission
        })

        card = await card.save()

        sendJSONresponse(res, 201, card)
    } catch (e) {
        return next(e)
    }
}

async function card_list (req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let cards = await Card.find({restaurantId: restaurantId})
        sendJSONresponse(res, 200, cards)
    } catch (e) {
        return next(e)
    }
}

async function card_update (req, res, next) {
    try {
        const cardId = req.params.cardId

        let card = await Card.findById(cardId)
        card = Object.assign(card, req.body)

        card = await card.save()

        sendJSONresponse(res, 200, card)
    } catch(e) {
        return next(e)
    }
}

async function card_delete (req, res, next) {
    try {
        const cardId = req.params.cardId

        let card = await Card.findByIdAndRemove(cardId)

        sendJSONresponse(res, 203, card)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    card_create,
    card_list,
    card_update,
    card_delete
}
