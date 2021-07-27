const { Schema, model, models } = require("mongoose");
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const bcrypt = require("bcrypt");

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
    password: { type: String, match: [passwordRegExp, "Invalid password"] },
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
      default:
        "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg",
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

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Userhost = model("Userhost", userSchema);

module.exports = Userhost;
