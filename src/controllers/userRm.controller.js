const UserRm = require('../models/userRm.model')
const jwt = require('jsonwebtoken')

module.exports = {
    async signup(req, res) {
      try {
        const { body } = req
        const userRm = await UserRm.create(body)

        const token = jwt.sign(
        { userId: userRm._id },
        process.env.SECRET,
        {expiresIn: 60 * 60 * 24 * 365 }
        )
  
        res.status(201).json({ token })
        }catch(err) {   
            res.status(400).json({ message: err.message })
         }
      }
   }

