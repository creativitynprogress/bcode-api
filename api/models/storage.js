const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Storage', storageSchema)
