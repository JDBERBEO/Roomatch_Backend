const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    AdvertismentId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    roomie: {
      type: Schema.Types.ObjectId,
      ref: "Roomie",
      required: [true, 'you should be logged to create a reservation'],
    },
    endDate: {
      type: Date,
      required: false,
    },
    paidReservation: {
      type: Number,
      required: false,
    },
    ocupationStatus: String,
  },
  {
    timestamps: true,
  }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
