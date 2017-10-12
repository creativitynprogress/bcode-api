'use strict'

const Restaurant = require('../models/restaurant')
const Owner = require('../models/owner')
const sendJSONresponse = require('./shared').sendJSONresponse
const base64Img = require('base64-img')
const path = require('path')

async function restaurant_create(req, res, next) {
    try {
        const owner = req.user

        let restaurant = new Restaurant({
            ownerId: owner._id,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            rfc: req.body.rfc,
            socialCapital: req.body.socialCapital,
            ticketText: req.body.ticketText
        })

        restaurant = await restaurant.save()

        sendJSONresponse(res, 200, restaurant)
    } catch (e) {
        return next(e)
    }
}

async function restaurant_update(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let restaurant = await Restaurant.findById(restaurantId)
        restaurant = Object.assign(restaurant, req.body)

        if (req.body.image) {
            let fileName = Date.now()
            let filepath = base64Img.imgSync(req.body.image, path.join('/home/gerson/bcode-api/public/images', 'restaurant'), fileName)
            restaurant.image = '/images/restaurant/' + fileName + path.extname(filepath)
        }

        await restaurant.save()
        
        sendJSONresponse(res, 200, restaurant)

    } catch(e) {
        return next(e)
    }
}

async function restaurant_list(req, res, next) {
    try {
        const owner = req.user

        let restaurants = await Restaurant.find({
            ownerId: owner._id
        })

        sendJSONresponse(res, 200, restaurants)

    } catch (e) {
        return next(e)
    }
}

async function restaurant_details(req, res, next) {
    try {
        const owner = req.user
        const restaurantId = req.params.restaurantId

        let restaurant = await Restaurant.findById(restaurantId)
        sendJSONresponse(res, 200, restaurant)
    } catch(e) {
        return next(e)
    }
}

async function restaurant_delete(req, res, next) {
    try {
        const owner = req.user
        const restaurantId = req.params.restaurantId

        let restaurant = await Restaurant.findById(restaurantId)

        if (restaurant.ownerId == owner._id) {
            restaurant = await Restaurant.findByIdAndRemove(restaurantId)
            sendJSONresponse(res, 204, restaurant)
        }

    } catch (e) {
        return next(e)
    }
}

module.exports = {
    restaurant_create,
    restaurant_list,
    restaurant_details,
    restaurant_delete,
    restaurant_update
}