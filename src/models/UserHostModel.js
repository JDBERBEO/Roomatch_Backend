const { Schema, model, models } = require("mongoose");
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
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
      match: [emailRegex, "Invalid e-mail"],
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
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Advertisement" }],
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
