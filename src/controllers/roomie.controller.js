const Roomie = require("../models/roomie.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { welcomeRoomie } = require("../utils/mailer");

module.exports = {
  async signup(req, res) {
    try {
      const { body } = req;
      const roomie = await Roomie.create(body);
      const token = jwt.sign({ userId: roomie._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      await welcomeRoomie(roomie)
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async photoProfile(req, res) {
    try {
      const { roomie, body } = req;

      if (body.photos.length === 0) {
        body.photos[0] =
          "https://res.cloudinary.com/evollve-sas/image/upload/v1627351292/roomatch/166-1666981_silhouette-unknown-people-hd-png-download_gnkzz1.jpg";
      }
      const profilePhoto = await Roomie.findByIdAndUpdate(
        roomie,
        { photos: body.photos[0] },
        {
          new: true,
        }
      );
      res.status(201).json(profilePhoto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;

      const roomie = await Roomie.findOne({ email });

      if (!roomie) {
        throw new Error("Password or invalid email");
        console.log("error", Error);
      }

      const isValid = await bcrypt.compare(password, roomie.password);

      if (!isValid) {
        throw new Error("Password or invalid email");
      }

      const token = jwt.sign({ userId: roomie._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(201).json({ token });
    } catch (error) {
      console.log("ERROR", error.message);

      res.status(400).json({ message: error.message });
    }
  },
  async show(req, res) {
    try {
      const { roomie } = req;
      const profile = await Roomie.findById(roomie);
      res.status(200).json(profile);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  async list(req, res) {
    try {
      const roomies = await Roomie.find().populate("reservation");
      res.status(200).json(roomies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  async update(req, res) {
    try {
      const { roomie, body } = req;
      const profile = await Roomie.findByIdAndUpdate(roomie, body, {
        new: true,
      });
      res.status(200).json(profile);
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.dir(err.message);
    }
  },
  async destroy(req, res) {
    try {
      const { roomieId } = req.params;
      const roomie = await UserHost.findByIdAndDelete(roomieId);
      res.status(400).json(roomie);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
