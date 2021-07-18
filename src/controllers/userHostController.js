const UserHost = require("../models/UserHostModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const userh = await UserHost.create(body);
      const token = jwt.sign({ userId: userh._id }, "" + process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  async list(req, res) {
    try {
      const userh = await UserHost.find();
      res.status(201).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },
  async show(req, res) {
    try {
      const { userhId } = req.params;
      const userh = await UserHost.findById(userhId);
      res.status(200).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const {
        params: { userhId },
        body,
      } = req;
      const userh = await UserHost.findByIdAndUpdate(userhId, body, {
        new: true,
      });
      res.status(200).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const { userhId } = req.params;
      const userh = await UserHost.findByIdAndDelete(userhId);
      res.status(400).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  async signin(req, res) {
    try {
      const { password, email } = req.body;
      const user = await UserHost.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ userId: user._id }, "" + process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log({ message: err.message });
    }
  },

  async show(req, res) {
    try {
      const { roomie } = req;
      console.log(roomie);
      const profile = await UserHost.findById(roomie).select("-password");
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
      console.log({ message: err.message });
    }
  },
};
