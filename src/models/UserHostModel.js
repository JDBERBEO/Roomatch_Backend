const { Schema, model, models } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The field is required"],
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          async validator(email) {
            try {
              const userhost = await models.Userhost.findOne({ email });
              return !userhost;
            } catch (error) {
              return false;
            }
          },
          message: "this email is already been used",
        },
      ],
    },
    password: String,
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [20, "Do a better description about you (minimum 20 words)"],
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    ranking: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);

const Userhost = model("Userhost", userSchema);

module.exports = Userhost;
