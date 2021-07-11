const Reservation = require('../models/reservation.model')
const Roomie = require('../models/roomie.model')

module.exports = {
  async create(req, res) {
    try {
      const { body, roomie } = req
      const userRoomie = await Roomie.findById(roomie);
      // if(!userRoomie) {
      //   throw new Error('User had been created')
      // }

      const reservation = await Reservation.create({ ...body, roomie })
      userRoomie.allReservation.push({id});
      
      await userRoomie.save({ validateBeforeSave : false });
      res.status(201).json(reservation)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },

  async show(req, res) {
    try {
      const { params: { id }, roomie } = req;
      const reservation = await Reservation.findById( {_id: id,  roomie} ).populate('roomie','name')
      if(!reservation) throw Error('You are not allowed')
      res.status(201).json(reservation)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  },
  async list(req, res) {
    try {
      const { roomie } = req
      const reservations = await Reservation.find({ roomie }).select('')
      res.status(200).json(reservations)
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  },
  async showAll(req, res) {
    try {
      const allReservations = await Reservation.find().lean();
      res.status(200).json(allReservations);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { params: { id }, roomie } = req;
      
      const reservation = await Reservation.findByIdAndUpdate({ _id: id, roomie, new: true, });
      
      if(!reservation) throw Error('You are not allowed')
     
      res.status(200).json(reservation); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const {params: { id }, roomie } = req;
      const reservation = await Reservation.findByIdAndDelete({ _id: id, roomie });
      
      if(!reservation.deletedCount) throw Error('You are not allowed')
      
      res.status(400).json({ message: 'Reservation deleted'});
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};


