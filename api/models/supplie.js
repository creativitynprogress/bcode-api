const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplieSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    quantityAlert: {
        type: Number
    },
    unit: {
        type: String
    },
    daysToBuy: {
        type: String
    },
    storageId: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Supplie', supplieSchema)
