const mongoose = require('mongoose')
const Schema = mongoose.Schema

const familySchema = new Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    restaurantId: {
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Family', familySchema)
