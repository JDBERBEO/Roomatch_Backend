const roomieController = require('../controllers/userRm.controler.js') 
const router = require('express').Router()

router.route("/signup").post(roomieController.create); 
router.route("/signin").post(roomieController.signin);

module.exports = router
