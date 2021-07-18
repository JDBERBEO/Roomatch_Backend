const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    living_space_type: {
      type: String,
      required: true,
    },
    AdvertismentId: {
      type: Schema.Types.ObjectId,
      required: false,
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
    endDate: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
      required: true,
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
