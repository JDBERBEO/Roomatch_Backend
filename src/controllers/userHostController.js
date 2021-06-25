const UserHost = require("../models/UserHostModel");

module.exports = {
  signup(req, res) {
    const { body } = req;
    UserHost.create(body)
      .then((userh) => {
        res.status(201).json(userh);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: `something went wrong: ${err.message}` });
      });
  },
  list(req, res) {
    UserHost.find()
      .then((userh) => {
        res.status(201).json(userh);
      })
      .catch((err) => {
        res.status(400).json({ message: "Something went wrong" });
      });
  },
  show(req, res) {
    const { userhId } = req.params;
    UserHost.findById(userhId)
      .then((userh) => {
        res.status(200).json(userh);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
  },

  update(req, res) {
    const {
      params: { userhId },
      body,
    } = req;

    UserHost.findByIdAndUpdate(userhId, body, { new: true })
      .then((userh) => {
        res.status(200).json(userh);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
  },
  destroy(req, res) {
    const { userhId } = req.params;
    UserHost.findByIdAndDelete(userhId)
      .then((userh) => {
        res.status(400).json(userh);
      })
      .catch((err) => {
        res.status(400).json({ message: "something went wrong" });
      });
  },
};
