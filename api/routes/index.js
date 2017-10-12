const express = require('express')
const passportService = require('../config/passport')
const passport = require('passport')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')
const mime = require('mime')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
      crypto.pseudoRandomBytes(16, (err, raw) => {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
      })
    }
  })

  const upload_file = multer({
    storage: storage
  })

  const authenticathion_controller = require('../controllers/authentication')
  const employee_controller = require('../controllers/employee')
  const restaurant_controller = require('../controllers/restaurant')
  const storage_controller = require('../controllers/storage')
  const supplie_controller = require('../controllers/supplie')
  const product_controller = require('../controllers/product')
  const family_controller = require('../controllers/family')
  const card_controller = require('../controllers/card')
  const table_controller = require('../controllers/table')
  const ticket_controller = require('../controllers/ticket')
  const order_controller = require('../controllers/order')
  const provider_controller = require('../controllers/provider')

  // Middleware to require login/authentication
const require_auth = passport.authenticate('jwt', {
    session: false
  })
  
  const require_login = passport.authenticate('local', {
    session: false
  })

  module.exports = (app) => {
      const api_routes = express.Router()
      const auth_routes = express.Router()
      const restaurant_routes = express.Router()
      const employee_routes = express.Router()
      const storage_routes = express.Router()
      const supplie_routes = express.Router()
      const product_routes = express.Router()
      const family_routes = express.Router()
      const card_routes = express.Router()
      const table_routes = express.Router()
      const ticket_routes = express.Router()
      const order_routes = express.Router()
      const provider_routes = express.Router()

      api_routes.use('/auth', auth_routes)
      auth_routes.post('/register', upload_file.single('image'), authenticathion_controller.register)
      auth_routes.post('/login', require_login, authenticathion_controller.login)

      api_routes.use('/provider', provider_routes)
      provider_routes.post('/', require_auth, provider_controller.provider_create)
      provider_routes.get('/', require_auth, provider_controller.provider_list)
      provider_routes.get('/:providerId', require_auth, provider_controller.provider_details)
      provider_routes.put('/:providerId', require_auth, provider_controller.provider_update)
      provider_routes.delete('/:providerId', require_auth, provider_controller.provider_delete)

      api_routes.use('/restaurant', restaurant_routes)
      restaurant_routes.post('/', require_auth, upload_file.single('image'), restaurant_controller.restaurant_create)
      restaurant_routes.get('/', require_auth, restaurant_controller.restaurant_list)
      restaurant_routes.put('/:restaurantId', require_auth, upload_file.single('image'), restaurant_controller.restaurant_update)
      restaurant_routes.get('/:restaurantId', require_auth, restaurant_controller.restaurant_details)
      restaurant_routes.delete('/:restaurantId', require_auth, restaurant_controller.restaurant_delete)

      restaurant_routes.use('/:restaurantId/employee', employee_routes)
      employee_routes.post('/', require_auth, upload_file.single('image'), employee_controller.employee_create)
      employee_routes.get('/', require_auth, employee_controller.employee_list)
      employee_routes.get('/:employeeId', require_auth, employee_controller.employee_details)
      employee_routes.delete('/:employeeId', require_auth, employee_controller.employee_delete)

      restaurant_routes.use('/:restaurantId/storage', storage_routes)
      storage_routes.post('/', require_auth, storage_controller.storage_create)
      storage_routes.get('/', require_auth, storage_controller.storage_list)
      storage_routes.put('/:storageId', require_auth, storage_controller.storage_update)
      storage_routes.delete('/:storageId', require_auth, storage_controller.storage_delete)

      restaurant_routes.use('/:restaurantId/supplie', supplie_routes)
      supplie_routes.post('/', require_auth, supplie_controller.supplie_create)
      supplie_routes.get('/', require_auth, supplie_controller.supplie_list)
      supplie_routes.get('/:supplieId', require_auth, supplie_controller.supplie_details)
      supplie_routes.put('/:supplieId', require_auth, supplie_controller.supplie_update)
      supplie_routes.delete('/:supplieId', require_auth, supplie_controller.supplie_delete)

      restaurant_routes.use('/:restaurantId/product', product_routes)
      product_routes.post('/', require_auth, upload_file.single('image'), product_controller.product_create)
      product_routes.get('/', require_auth, product_controller.product_list)
      product_routes.get('/:productId', require_auth, product_controller.product_details)
      product_routes.put('/:productId', require_auth, product_controller.product_update)
      product_routes.delete('/:productId', require_auth, product_controller.product_delete)
      product_routes.post('/:productId/ingredient', require_auth, product_controller.product_ingredient_add)
      product_routes.delete('/:productId/ingredient/:ingredientId', require_auth, product_controller.product_ingredient_delete)

      restaurant_routes.use('/:restaurantId/family', family_routes)
      family_routes.post('/', require_auth, family_controller.family_create)
      family_routes.get('/', require_auth, family_controller.family_list)
      family_routes.put('/:familyId', require_auth, family_controller.family_update)
      family_routes.delete('/:familyId', require_auth, family_controller.family_delete)

      restaurant_routes.use('/:restaurantId/card', card_routes)
      card_routes.post('/', require_auth, card_controller.card_create)
      card_routes.get('/', require_auth, card_controller.card_list)
      card_routes.put('/:cardId', require_auth, card_controller.card_update)
      card_routes.delete('/:cardId', require_auth, card_controller.card_delete)

      restaurant_routes.use('/:restaurantId/table', table_routes)
      table_routes.post('/', require_auth, table_controller.table_create)
      table_routes.get('/employee', require_auth, table_controller.table_list_employee)
      table_routes.get('/', require_auth, table_controller.table_list_state)
      table_routes.delete('/:tableId', require_auth, table_controller.table_delete)

      table_routes.use('/:tableId/order', order_routes)
      order_routes.post('/', require_auth, order_controller.order_create)
      order_routes.put('/:orderId', require_auth, order_controller.order_update)
      order_routes.delete('/:orderId', require_auth, order_controller.order_delete)
      order_routes.put('/state', require_auth, order_controller.order_change_state)

      restaurant_routes.use('/:restaurantId/ticket', ticket_routes)
      ticket_routes.post('/', require_auth, ticket_controller.ticket_create)
      ticket_routes.get('/', require_auth, ticket_controller.ticket_list_employee)
      ticket_routes.get('/employee', require_auth, ticket_controller.ticket_list_employee)
      ticket_routes.delete('/:ticketId', require_auth, ticket_controller.ticket_delete)
      ticket_routes.post('/:ticketId/pay', require_auth, ticket_controller.ticket_add_pay)
      ticket_routes.delete('/:ticketId/pay/:payId', require_auth, ticket_controller.ticket_delete_pay)
      ticket_routes.put('/cancel', require_auth, ticket_controller.ticket_cancel)

      app.use('/api', api_routes)
  }