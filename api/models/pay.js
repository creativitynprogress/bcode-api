const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paySchema = new Schema({
    quantity: Number,
    tip: Number,
    bank: {
        card: {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        },
        charged: {
            type: Boolean,
            default: false
        }
    }
    
})

module.exports = mongoose.model('Pay', paySchema)
