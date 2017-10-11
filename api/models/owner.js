const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const ownerSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    maxSubsidiaries: {
        type: Number,
        min: 1
    },
    enable: {
        type: Boolean
    },
    subscription: {
        type: String,
        enum: ['Survivor', 'Evolution']
    },
    corporate: {
        name: String,
        description: String,
        address: String,
        image: String
    },
    role: {
        type: String,
        enum: ['Owner', 'Admin', 'Manager'],
        default: 'Owner'
    }
})

ownerSchema.pre('save', function (next) {
    const SALT_FACTOR = 5
    const owner = this

    if (!owner.isModified('password')) return next()

    console.log(owner)
    const salt = bcrypt.genSaltSync(SALT_FACTOR)
    const hash = bcrypt.hashSync(owner.password, salt)

    owner.password = hash
    next()
})

//  Method to compare password for login
ownerSchema.methods.comparePassword = function (candidatePassword, cb) {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password)
    cb(null, isMatch)
}

module.exports = mongoose.model('Owner', ownerSchema)