const router = require("express").Router();
const roomieController = require("../controllers/roomie.controller");
const { auth } = require("../utils/middlewares");
const { formData } = require("../utils/formData");

router.route("/signup").post(roomieController.signup);
router.route("/signin").post(roomieController.signin);
router.route("/profile").put(auth, roomieController.update);
router.route("/updatePhoto").put(auth, formData, roomieController.photoProfile);
router.route("/profile").get(auth, roomieController.show);

router.route("/").get(roomieController.list);

module.exports = router;
