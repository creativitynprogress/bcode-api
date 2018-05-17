const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    errorTerm: {
        type: Number
    },
    supplieId: {
        type: Schema.Types.ObjectId,
        ref: 'Supplie'
    }
})

const productSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    averageSale: {
        type: Number
    },
    realPrice: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    iva: {
        type: Boolean
    },
    time: {
        type: Number
    },
    family: {
        type: Schema.Types.ObjectId,
        ref: 'Family'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    bar: {
        type: Boolean
    },
    ingredients: [ingredientSchema]
})

module.exports = mongoose.model('Product', productSchema)