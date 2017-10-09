const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    rfc: {
        type: String
    },
    phone1: {
        type: String
    },
    phone2: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    socialCapital: {
        type: Number
    },
    ticketTest: {
        type: String
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
