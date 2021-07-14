const router = require("express").Router();
const reservationController = require("../controllers/reservation.controller");
const { auth } = require("../utils/middlewares");

router.route("/").get(reservationController.list);
router.route("/").post(auth, reservationController.create);
router.route("/:id").get(reservationController.show);
//router.route("/").get(reservationController.showAll);
router.route('/:id').put(reservationController.update);
router.route('/:id').delete(reservationController.delete);
module.exports = router;
