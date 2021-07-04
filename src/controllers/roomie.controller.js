const Roomie = require('../models/roomie.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

module.exports = {
    async signup(req, res) {
      try {
        const { body } = req
        const roomie = await Roomie.create(body)

        const token = jwt.sign(
        { userId: roomie._id },
        process.env.SECRET,
        {expiresIn: 60 * 60 * 24 * 365 }
        )
  
        res.status(201).json({ token })
        }catch(err) {   
            res.status(400).json({ message: err.message })
          console.log(err.message)
          }
      },

   async signin(req, res) {
      try {
        const { email, password } = req.body
  
        const roomie = await Roomie.findOne({ email })
  
        if(!roomie) {
          throw new Error('Password or invalid email')
        }
  
        const isValid = await bcrypt.compare(password, roomie.password)
  
        if(!isValid) {
          throw new Error('Password or invalid email')
        }
  
        const token = jwt.sign(
          { userId: roomie._id },
          process.env.SECRET,
          { expiresIn: 60 * 60 * 24 * 365 }
        )
  
        res.status(201).json({ token })
      } catch(error) {
        res.status(400).json({ message: error.message })
        console.log(error)
      }
    },
    async show(req, res) {
      try {
        const { roomie } = req
        const profile = await UserRm.findById(roomie).select('-password')
        res.status(200).json(profile)
      } catch(error) {
        res.status(404).json({ message: error.message })
        console.log(error)
      }
    }
  }

     // async list(req, res) {
      //   try{ 
      //     const { roomie } = req 
      //     const profile = await Roomie.find({roomie})
      //     res.status(200).json(roomie)
      //   } catch(err) {   
      //   res.status(500).json({ message: err.message })
      //  }
      // },


