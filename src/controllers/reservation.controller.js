const { populate } = require('../models/reservation.model')
const Reservation = require('../models/reservation.model')

module.export = {
    create(req, res){
      const { body, params: { userId } } = req
        
      Reservation
        .create({ 
        ... body, 
        userRm: userId
      })
      .then(reservation => {
        res.status(201).json(reservation)
      })
      .catch(error => {
        res.status(400).json({ message : error.message })
      })
    },

    show(req, res){
      const  { reservationId }  = req.params

      Reservation
      .findById(reservationId)
      .populate('userRm')
      .then(reservation => {
        res.status(201).json(reservation)
      })
      .catch(error => {
        res.status(404).json({ message : error.message })
      })
    },
}

