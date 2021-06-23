const { Schema, model } = require("mongoose");

const adverSchema = new Schema(
  {
    living_space: { type: String, required: [true, "The field is requiered"] },
    description: { type: String, required: [true, "The field is requiered"] },
    rooms: { type: Number, required: [true, "The field is requiered"] },
    bathroom: { type: Number, required: [true, "The field is requiered"] },
    private_bathroom: {
      type: Boolean,
      required: [true, "The field is requiered"],
    },
    parking: { type: Number, required: [true, "The field is requiered"] },
    photo: { type: String, required: [true, "The field is requiered"] },
    tags: { type: Array, required: [true, "The field is requiered"] },
    price: { type: Number, required: [true, "The field is requiered"] },
    public_services: {
      type: Array,
      required: [true, "The field is requiered"],
    },
    facilities: { type: Array, required: [true, "The field is requiered"] },
    activities: { type: String, required: [true, "The field is requiered"] },
    ranking: { type: Number, required: [true, "The field is requiered"] },
    house_rules: { type: String, requires: [true, "The field is requiered"] },
  },
  {
    timeStamps: true,
  }
);

const Advertisement = model("Advertisement", adverSchema);

module.exports = Advertisement;
