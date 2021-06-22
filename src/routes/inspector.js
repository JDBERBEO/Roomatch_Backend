const router = require('express').Router()
// const inspectorController = require('../controllers')

router.route('/signup').post((req, res) => { res.send('ok sign post '); })
router.route('/login').post((req, res) => { res.send('ok login post'); })

//borrar token
// router.route('/logout').post((req, res) => { res.send('ok post logout'); }) 
//las demás se realizan según necesidad del proyecto 
// router.route('/inspector').get((req, res) => { res.send('ok get inspector '); })
// router.route('/editProfile').put((req, res) => { res.send('ok editprofile '); })
// router.route('/profile').delete((req, res) => { res.send('ok Delete profile '); })

module.exports = router

