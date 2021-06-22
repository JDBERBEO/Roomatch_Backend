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
      },
   async signin(req, res) {
     try {
       const { email, password } = req.body
 
       const user = await User.findOne({ email })
 
       if(!user) {
         throw new Error('Password or invalid email')
       }
 
       const isValid = await bcrypt.compare(password, user.password)
 
       if(!isValid) {
         throw new Error('Password or invalid email')
       }
 
       const token = jwt.sign(
         { userId: user._id },
         process.env.SECRET,
         { expiresIn: 60 * 60 * 24 * 365 }
       )
 
       res.status(201).json({ token })
     } catch(error) {
       res.status(400).json({ message: error.message })
     }
   },
   async show(req, res) {
     try {
       const { user } = req
       const profile = await User.findById(user).select('-password')
       res.status(200).json(profile)
     } catch(error) {
       res.status(404).json({ message: error.message })
     }
   }
 }

