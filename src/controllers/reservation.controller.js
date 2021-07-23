const Reservation = require("../models/reservation.model");
const Roomie = require("../models/roomie.model");
const Advertisement = require("../models/SpaAdverModel");

module.exports = {
  async create(req, res) {
    try {
      const { body, roomie } = req;
      console.log("body", body);
      console.log("roomie", roomie);
      const userRoomie = await Roomie.findById(roomie);
      console.log("userRoomie", userRoomie);
      if (!userRoomie) {
        throw new Error("User not found");
      }

      const reservation = await Reservation.create({ ...body, roomie });
      userRoomie.allReservations.push(reservation._id);

      const advertisement = await Advertisement.findById(body.advertisementId);
      advertisement.reservations.push(reservation._id);
      console.log("advertisement", advertisement);
      await advertisement.save({ validateBeforeSave: false });

      await userRoomie.save({ validateBeforeSave: false });
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error.message);
    }
  },

  async show(req, res) {
    try {
      const {
        params: { id },
        roomie,
      } = req;
      const reservation = await Reservation.findById({
        _id: id,
        roomie,
      }).populate("roomie", "name");
      if (!reservation) throw Error("You are not allowed");
      res.status(201).json(reservation);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  async list(req, res) {
    try {
      const { roomie } = req;
      const reservations = await Reservation.find({ roomie }).select("");
      res.status(200).json(reservations);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  async showAllAdvertisementsById(req, res) {
    const { advertisementId } = req.query;
    console.log("advertisementId", advertisementId);
    try {
      //con el advertisementId encuentre todas las reservas asociadas a ese advertisement
      //se crean las reservas dentro del modelo de advertisement
      //cuando se crea una reserva, se debe incluir dentro del advertisement por su id
      const allReservations = await Reservation.find().lean();
      res.status(200).json(allReservations);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log(err.message);
    }
  },

  async update(req, res) {
    try {
      const {
        params: { id },
        roomie,
      } = req;

      const reservation = await Reservation.findByIdAndUpdate({
        _id: id,
        roomie,
        new: true,
      });

      if (!reservation) throw Error("You are not allowed");

      res.status(200).json(reservation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const {
        params: { id },
        roomie,
      } = req;
      const reservation = await Reservation.findByIdAndDelete({
        _id: id,
        roomie,
      });

      if (!reservation.deletedCount) throw Error("You are not allowed");

      res.status(400).json({ message: "Reservation deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
