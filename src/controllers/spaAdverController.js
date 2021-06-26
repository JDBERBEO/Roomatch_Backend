const Advertisement = require("../models/SpaAdverModel");
const Host = require("../models/UserHostModel");

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
      .then((advertisement) => {
        Host.findById(hostId).then((host) => {
          host.posts.push(advertisement._id);

          host
            .save({ validateBeforeSave: false })
            .then(() => {
              res.status(201).json(advertisement);
            })
            .catch((err) => {
              res.status(400).json({ message: err.message });
            });
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  },

  list(req, res) {
    const { hostId } = req.params;
    Advertisement.find({ host: hostId })
      .then((adver) => {
        res.status(201).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
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
        res.status(400).json({ message: err.message });
      });
  },

  update(req, res) {
    const {
      params: { adverId },
      body,
    } = req;

    Advertisement.findByIdAndUpdate(adverId, body, { new: true })
      .then((adver) => {
        res.status(200).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  },

  destroy(req, res) {
    const { adverId } = req.params;
    Advertisement.findByIdAndDelete(adverId)
      .then((adver) => {
        res.status(400).json(adver);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  },
};
