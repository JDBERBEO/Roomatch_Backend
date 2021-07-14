const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    AdvertismentId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    range: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: false,
      },
    },
    roomie: {
      type: Schema.Types.ObjectId,
      ref: "Roomie",
      required: false,
    },
    paidReservation: {
      type: Number,
      required: true,
    },
    ocupationStatus: String,
  },
  {
    timestamps: true,
  }
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
