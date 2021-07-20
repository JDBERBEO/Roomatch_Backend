const Advertisement = require("../models/SpaAdverModel");
const Host = require("../models/UserHostModel");

module.exports = {
  async create(req, res) {
    try {
      const { body, roomie } = req;
      console.log("body", body);
      console.log("roomie", roomie);
      const advertisement = await Advertisement.create({
        ...body,
        host: roomie,
      });
      const host = await Host.findById(roomie);
      host.posts.push(advertisement._id);
      await host.save({ validateBeforeSave: false });
      res.status(201).json(advertisement);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const { roomie } = req;
      const adver = await Advertisement.find({ host: roomie });
      res.status(201).json(adver);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
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

  async showAll(req, res) {
    const { filterAd } = req.params;
    // const { selectedDays } = req.query;
    // console.log("query", selectedDays);

    try {
      const allAds = await Advertisement.find({ city: filterAd }).lean();
      console.log("allads", allAds);
      res.status(200).json(allAds);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
