const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    living_space_type: {
      type: String,
      required: true,
    },
    AdvertisementId: {
      type: Schema.Types.ObjectId,
      ref: "Advertisement",
      required: true,
    },
    selectedDays: {
      type: [String],
      required: true,
    },
    roomie: {
      type: Schema.Types.ObjectId,
      ref: "Roomie",
      required: [false, "you should be logged to create a reservation"],
    },
    paidReservation: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
