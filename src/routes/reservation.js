const router = require('express').Router()
const reservationController = require('../controllers/reservation.controller')

router.route('/:userId').post(()=>reservationController.create)
router.route('/:reservationId').get(()=>reservationController.show)

module.exports = router
