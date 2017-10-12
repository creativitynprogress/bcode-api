const mongoose = require('mongoose')
const Schema = mongoose.Schema

const providerSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone1: {
        type: String
    },
    phone2: {
        type: String
    },
    email: {
        type: String
    },
    webPage: {
        type: String
    },
    rfc: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }
})

module.exports = mongoose.model('Provider', providerSchema)
