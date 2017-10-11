'use strict'

const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Owner = require('../models/owner')
const config = require('../config/config')
const sendJSONresponse = require('./shared').sendJSONresponse

function generateToken(owner) {
    return jwt.sign(owner, config.secret, {})
}

function setOwnerInfo(owner) {
    const ownerInfo = {
        _id: owner._id,
        email: owner.email,
        name: owner.email,
        lastname: owner.lastname,
        maxSubsidiaries: owner.maxSubsidiaries,
        enable: owner.enable,
        subscription: owner.subscription,
        corporate: owner.corporate,
        role: owner.role
    }

    return ownerInfo
}

function login(req, res, next) {
    let ownerInfo = setOwnerInfo(req.user)

    sendJSONresponse(res, 200, {
        token: generateToken(ownerInfo),
        user: ownerInfo
    })
}


async function register(req, res, next) {
    try {
        let ownerExist = await Owner.findOne({email: req.body.email})

        if (ownerExist) {
            return next(new Error('User alredy exist'))
        }

        let owner = new Owner({
            name: req.body.name,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            maxSubsidiaries: req.body.maxSubsidiaries,
            enable: req.body.enable,
            subscription: req.body.subscription,
            password: req.body.password,
            role: req.body.role || 'Owner',
            corporate: {
                description: req.body.description,
                address: req.body.address,
                name: req.body.name
            }
        })

        if (req.file) {
            owner.corporate.image = req.file.filename
        }

        owner = await owner.save()
        let ownerInfo = setOwnerInfo(owner)

        sendJSONresponse(res, 200, {
            token: generateToken(ownerInfo),
            user: ownerInfo
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    login,
    register
}
