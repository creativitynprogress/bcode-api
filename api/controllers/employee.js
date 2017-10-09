'use strict'

const Employee = require('../models/employee')
const Restaurant = require('../models/restaurant')
const sendJSONresponse = require('./shared').sendJSONresponse

async function employee_create(req, res, next) {
    try {
        const owner = require.user
        const restaurantId = req.params.restaurantId

        let restaurant = await Restaurant.findById(restaurantId)

        if (restaurant) {
            let employee = new Employee({
                restaurantId: restaurantId,
                role: req.body.role,
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                lastname: req.body.lastname,
                phone: req.body.phone,
                imss: req.body.imss,
            })

            if (req.file) {
                employee.image = req.file.filename
            }

            employee = await employee.save()

            sendJSONresponse(res, 201, employee)
        }
    } catch(e) {
        return next(e)
    }
}

async function employee_list(req, res, next) {
    try {
        const restaurantId = req.params.restaurantId

        let employees = await Employee.find({restaurantId: restaurantId})

        sendJSONresponse(res, 200, employees)
    } catch(e) {
        return next(e)
    }
}

async function employee_details(req, res, next) {
    try {
        const employeeId = req.params.employeeId

        let employee = await Employee.findById(employeeId)

        sendJSONresponse(res, 200, employee)
    } catch(e) {
        return next(e)
    }
}

async function employee_delete(req, res, next) {
    try {
        const employeeId = req.params.employeeId

        let employee = await Employee.findByIdAndRemove(employeeId)

        sendJSONresponse(res, 204, employee)
    } catch(e) {
        return next(e)
    }
}

module.exports = {
    employee_create,
    employee_list,
    employee_details,
    employee_delete
}