const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
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
        enum: ['Survivor','Evolution']
    }, 
    corporate: {
        name: String,
        description: String,
        address: String,
        image: String
    }
})

ownerSchema.pre('save', function (next) {
    const owner = this
    const SALT_FACTOR = 5
  
    if (!owner.isModified('password')) return next()
  
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) return next(err)
  
      bcrypt.hash(owner.password, salt, null, function (err, hash) {
        if (err) return next(err)
        owner.password = hash
        next()
      })
    })
  })
  
  //  Method to compare password for login
  ownerSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }
  
  module.exports = mongoose.model('owner', ownerSchema)