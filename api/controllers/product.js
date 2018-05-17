'use strict'

const Product = require('../models/product')
const sendJSONresponse = require('./shared').sendJSONresponse

async function product_create(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            averageSale: req.body.averageSale,
            realPrice: req.body.realPrice,
            salePrice: req.body.salePrice,
            iva: req.body.iva,
            time: req.body.time,
            family: req.body.family,
            restaurant: restaurantID
        })

        if (req.body.ingredients) {
            req.body.ingredients.forEach((ingredient) => {
                product.ingredients.push(ingredient)
            });
        }

        if (req.file) {
            product.image = req.file.filename
        }

        let product = await product.save()

        sendJSONresponse(res, 201, product)
    } catch (e) {
        return next(e)
    }
}

async function product_list(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let restaurants = await Product.find({
            restaurantId: restaurantId
        })

        sendJSONresponse(res, 200, restaurants)
    } catch (e) {
        return next(e)
    }
}

async function product_details(req, res, next) {
    try {
        const productId = req.params.productId

        let product = await Product.findById(productId)

        sendJSONresponse(res, 200, product)
    } catch (e) {
        return next(e)
    }
}

async function product_update(req, res, next) {
    try {
        const productId = req.params.productId

        let product = await Product.findById(productId)

        product = {
            name: req.body.name,
            description: req.body.description,
            averageSale: req.body.averageSale,
            realPrice: req.body.realPrice,
            salePrice: req.body.salePrice,
            iva: req.body.iva,
            time: req.body.time,
            familyId: req.body.familyId,
        }

        product = await product.save()

        sendJSONresponse(res, 200, product)
    } catch (e) {
        return next(e)
    }
}

async function product_delete(req, res, next) {
    try {
        const productId = req.params.productId

        let product = Product.findByIdAndRemove(productId)

        sendJSONresponse(res, 200, product)
    } catch (e) {
        return next(e)
    }
}

async function product_ingredient_add(req, res, next) {
    try {
        const productId = req.params.productId

        let product = await Product.findById(productId)

        let ingredient = req.body
        product.ingredients.push(ingredient)

        await product.save()

        sendJSONresponse(res, 201, ingredient)
    } catch (e) {
        return next(e)
    }
}

async function product_ingredient_delete(req, res, next) {
    try {
        const productId = req.params.productId
        const ingredientId = req.params.ingredientId

        let product = await Product.findById(productId)

        if (product) {
            let ingredient = await product.ingredients.id(ingredientId)
            await product.ingredients.id(ingredientId).remove()
            product = await product.save()

            sendJSONresponse(res, 203, ingredient)
        }
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    product_create,
    product_list,
    product_details,
    product_update,
    product_delete,
    product_ingredient_add,
    product_ingredient_delete
}