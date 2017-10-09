const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pay = require('./pay')

const ticketSchema = new Schema({
    total: {
        type: Number
    },
    date: {
        type: Date,
        default: new Date()
    },
    discount: {
        type: Number,
        default: 0
    },
    state: {
        type: String,
        enum: ['open', 'paid', 'cancelled'],
        default: 'open'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    orders: {
        type: [{type: Schema.Types.ObjectId, ref: 'Order'}]
    },
    pays: {
        type: [{type: Schema.Types.ObjectId, ref: 'Pay'}]
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)
