const router = require('express').Router()
const roomieController  = require('../controllers/roomie.controller')
//const { auth } = require('../utils/middlewares')

router.route('/signup').post(roomieController.signup)
router.route('/profile').get(roomieController.show)

module.exports = router