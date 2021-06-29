const UserHost = require("../models/UserHostModel");
const bcrypt = require("bcrypt");

module.exports = {
  async create(req, res) {
    try {
      const { body } = req;
      const userh = await UserHost.create(body);
      res.status(201).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async list(req, res) {
    try {
      const userh = await UserHost.find();
      res.status(201).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  async show(req, res) {
    try {
      const { userhId } = req.params;
      const userh = await UserHost.findById(userhId);
      res.status(200).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
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
    }
  },

  async destroy(req, res) {
    try {
      const { userhId } = req.params;
      const userh = await UserHost.findByIdAndDelete(userhId);
      res.status(400).json(userh);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
