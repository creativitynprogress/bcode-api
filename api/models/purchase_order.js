const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseOrderSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    supplie: {
        type: Schema.Types.ObjectId,
        ref: 'Supplie'
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('purchaseOrder', purchaseOrderSchema)
