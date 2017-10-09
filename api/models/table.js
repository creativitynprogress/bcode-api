const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Order = require('./order')

const tableSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    orders: {
        type: [{type: Schema.Types.ObjectId, ref: 'Order'}]
    },
    name: {
        type: String
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Table', tableSchema)
