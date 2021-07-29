const { Schema, model } = require("mongoose");

const adverSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "Userhost",
      required: true,
    },
    living_space: { type: String, required: [true, "The field is required"] },
    description: { type: String, required: [true, "The field is required"] },
    rooms: { type: Number, required: [true, "The field is required"] },
    bathroom: { type: Number, required: [true, "The field is required"] },
    private_bathroom: {
      type: Boolean,
      required: [true, "The field is required"],
    },
    parking: { type: Number, required: [true, "The field is required"] },
    photo: { type: [String], required: [true, "The field is required"] },
    tags: { type: [String], required: [false, "The field is required"] },
    price: { type: Number, required: [true, "The field is required"] },
    public_services: {
      type: String,
      required: [true, "The field is required"],
    },
    facilities: { type: String, required: [true, "The field is required"] },
    activities: { type: String, required: [false, "The field is required"] },
    ranking: { type: Number, required: [false, "The field is required"] },
    house_rules: { type: String, required: [true, "The field is required"] },
    city: { type: String, requires: [true, "The field is required"] },
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  },
  {
    timeStamps: true,
  }
);

const Advertisement = model("Advertisement", adverSchema);

module.exports = Advertisement;
