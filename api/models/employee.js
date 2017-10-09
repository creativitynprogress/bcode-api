const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['waiter', 'hostess', 'bar', 'box', 'kitchen']
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    phone : {
        type: String
    },
    imss: {
        type: Boolean
    },
    image: {
        type: String
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

employeeSchema.pre('save', function (next) {
    const employee = this
    const SALT_FACTOR = 5
  
    if (!employee.isModified('password')) return next()
  
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
      if (err) return next(err)
  
      bcrypt.hash(employee.password, salt, null, function (err, hash) {
        if (err) return next(err)
        employee.password = hash
        next()
      })
    })
  })
  
  //  Method to compare password for login
  employeeSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }
  
  module.exports = mongoose.model('employee', employeeSchema)
  