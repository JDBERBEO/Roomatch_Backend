const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    AdvertismentId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    selectedDays: {
      type: [String],
      required: true,

      // validate: [
      //   {
      //     async validator(range) {
      //       try {
      //         const daysBookedrange = await models.Reservation.findOne({
      //           range,
      //         });
      //         return !daysBookedrange;
      //       } catch (error) {
      //         return false;
      //       }
      //     },
      //     message: "Days already booked",
      //   },
      // ],
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
