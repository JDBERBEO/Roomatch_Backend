const Advertisement = require("../models/SpaAdverModel");
const Host = require("../models/UserHostModel");

module.exports = {
<<<<<<< HEAD
  async create(req, res) {
    try {
      const {
        body,
        params: { hostId },
      } = req;
      const advertisement = await Advertisement.create({
        ...body,
        host: hostId,
=======
  create(req, res) {
    const {
      body,
      params: { hostId },
    } = req;
    Advertisement.create({
      ...body,
      host: hostId,
    })
      .then((adver) => {
        res.status(201).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
>>>>>>> develop
      });
      const host = await Host.findById(hostId);
      host.posts.push(advertisement._id);
      await host.save({ validateBeforeSave: false });
      res.status(201).json(advertisement);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

<<<<<<< HEAD
  async list(req, res) {
    try {
      const { hostId } = req.params;
      const adver = await Advertisement.find({ host: hostId });
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
=======
  list(req, res) {
    Advertisement.find()
      .then((adver) => {
        res.status(201).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: `something went wrong: ${err}` });
      });
  },
  show(req, res) {
    const { adverId } = req.params;
    Advertisement.findById(adverId)
      .populate("host")
      .then((adver) => {
        res.status(200).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
>>>>>>> develop
  },

  async show(req, res) {
    try {
      const { adverId } = req.params;
      const adver = await Advertisement.findById(adverId).populate("host");
      res.status(200).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const {
        params: { adverId },
        body,
      } = req;
      const adver = await Advertisement.findByIdAndUpdate(adverId, body, {
        new: true,
      });
      res.status(200).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const { adverId } = req.params;
      const adver = await Advertisement.findByIdAndDelete(adverId);
      res.status(400).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
