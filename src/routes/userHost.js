const router = require("express").Router();
const userHostController = require("../controllers/userHostController");
const { auth } = require("../utils/middlewares");

router.route("/").get(userHostController.list);
router.route("/signin").post(userHostController.signin);
router.route("/signup").post(userHostController.signup);
router.route("/profile").get(auth, userHostController.show);
router.route("/:userhId").get(userHostController.show);
router.route("/:userhId").put(userHostController.update);
router.route("/:userhId").delete(userHostController.destroy);

module.exports = router;
