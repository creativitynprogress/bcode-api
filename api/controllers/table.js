'use strict'

const Table = require('../models/table')
const sendJSONresponse = require('./shared.js').sendJSONresponse

async function table_create(req, res, next) {
    try {
        const employee = req.user
        const restaurantId = req.params.restaurantId

        let table = new Table({
            name: req.body.name,
            employeeId: employee._id,
            restaurantId: restaurantId
        })

        table = await table.save()

        sendJSONresponse(res, 201, table)
    } catch(e) {
        return next(e)
    }
}

async function table_list_state(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId
        const state = req.query.state

        let tables = await Table.find({state: state, restaurantId: restaurantId}).populate('orders')

        sendJSONresponse(res, 200, tables)
    } catch(e) {
        return next(e)
    }
}

async function table_list_employee(req, res, next) {
    try {
        const employee = req.user

        let tables = Table.find({employeeId: employeeId._id}).populate('orders')

        sendJSONresponse(res, 200, tables)
    } catch(e) {
        return next(e)
    }
}

async function table_delete(req, res, next) {
    try {
        const tableId = req.params.tableId

        let table = await Table.findByIdAndRemove(tableId)

        sendJSONresponse(res, 203, table)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    table_create,
    table_list_state,
    table_list_employee,
    table_delete
}