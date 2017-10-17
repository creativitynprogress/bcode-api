const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    comment: {
        type: String
    },
    state: {
        type: String,
        enum: ['Process', 'Complete']
    },
    time: {
        type: String,
        enum: ['first', 'second', 'third']
    },
    ingredientsRemove: {
        type: [Schema.Types.ObjectId],
        ref: 'Supplie'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('Order', orderSchema)
