const Advertisement = require("../models/SpaAdverModel");

module.exports = {
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
      });
  },

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
  },

  update(req, res) {
    const {
      params: { userId },
      body,
    } = req;

    Advertisement.findByIdAndUpdate(userId, body, { new: true })
      .then((adver) => {
        res.status(200).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
  },

  destroy(req, res) {
    const { userId } = req.params;
    Advertisement.findByIdAndDelete(userId)
      .then((adver) => {
        res.status(400).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
  },
};
