const { populate } = require("../models/reservation.model");
const Reservation = require("../models/reservation.model");

module.exports = {
  create(req, res) {
    const { body, roomie } = req;

    Reservation.create({
      ...body,
      roomie,
    })
      .then((reservation) => {
        res.status(201).json(reservation);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  },

  show(req, res) {
    const { reservationId } = req.params;

    Reservation.findById(reservationId)
      .populate("roomie")
      .then((reservation) => {
        res.status(201).json(reservation);
      })
      .catch((error) => {
        res.status(404).json({ message: error.message });
      });
  },

  async showAll(req, res) {
    try {
      const allReservations = await Reservation.find().lean();
      res.status(200).json(allReservations);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
