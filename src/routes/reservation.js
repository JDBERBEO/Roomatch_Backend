const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");
const { auth } = require("../utils/middlewares");

router.route("/").post(
  // auth,
  reservationController.create
);

router.route("/:reservationId").get(
  // auth,
  reservationController.show
);

module.exports = router;
