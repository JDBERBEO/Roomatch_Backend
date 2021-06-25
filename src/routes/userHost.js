const router = require("express").Router();
const userHostController = require("../controllers/userHostController");

router.route("/").get(userHostController.list);
router.route("/signup").post(userHostController.signup);
router.route("/:userhId").get(userHostController.show);
router.route("/:userhId").put(userHostController.update);
router.route("/:userhId").delete(userHostController.destroy);

module.exports = router;
