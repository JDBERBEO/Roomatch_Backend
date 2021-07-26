const router = require('express').Router()
const roomieController = require('../controllers/roomie.controller')
const { auth } = require('../utils/middlewares')
const { formData } = require('../utils/formData')

router.route('/signup').post(roomieController.signup)
router.route('/signin').post(roomieController.signin)
router.route('/profile').post(auth, formData, roomieController.photoProfile)
router.route('/profile').get(auth, roomieController.show)
router.route('/profile').put(auth, roomieController.update)
router.route('/profile').post(auth, roomieController.photoProfile)
router.route('/').get(roomieController.list)


module.exports = router