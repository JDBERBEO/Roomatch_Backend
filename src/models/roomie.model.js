const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");
//const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: [4, "el nombre es requerido"],
    },
    email: {
      type: String,
      required: true,
      validate: [
        {
          async validator(email) {
            try {
              const userRm = await models.Roomie.findOne({ email });
              return !userRm;
            } catch (error) {
              return false;
            }
          },
          message: "email is alredy use",
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: false,
    },
    ranking: [],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

const Roomie = model("Roomie", userSchema);
// UserRm = userrms se crea en la bd en minusculas y en plural
module.exports = Roomie;
