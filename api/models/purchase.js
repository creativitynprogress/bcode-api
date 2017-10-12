const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseSchema = ({
    supplie: {
        type: Schema.Types.ObjectId,
        ref: 'Supplie'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    cost: {
        type: Number
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String,
        enum: ['ton', 'lb', 'kg', 'g', 'ga', 'oz', 'l', 'ml', 'pza']
    },
    iva: {
        type: Boolean
    },
    payType: {
        type: String,
        enum: ['credit', 'bank', 'box', 'fund']
    },
    purchaseDay: {
        type: Date,
    },
    expireDay: {
        type: Date
    }
})

module.exports = mongoose.model('Purchase', purchaseSchema)
