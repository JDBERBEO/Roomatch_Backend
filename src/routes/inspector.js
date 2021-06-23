const router = require('express').Router()
const inspectorController = require('../controllers')

router.route('/signup').post((req, res) => { res.send('ok sign post '); })
router.route('/login').post((req, res) => { res.send('ok login post'); })

module.exports = router

