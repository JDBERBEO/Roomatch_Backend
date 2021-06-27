const Inspector = require("../models/inspectorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;

      const inspector = await Inspector.create(body);

      const token = jwt.sign(
        { inspectorId: inspector._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const inspector = await Inspector.findOne({ email });

      if (!inspector) throw new Error("Password or email invalid");

      const valid = await bcrypt.compare(password, inspector.password);

      if (!valid) throw new Error("Password or email invalid");
      const token = jwt.sign(
        { inspectorId: inspector._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
