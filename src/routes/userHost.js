const router = require("express").Router();
const userHostController = require("../controllers/userHostController");

router.route("/").get(userHostController.list);
router.route("/").post(userHostController.create);
router.route("/:userhId").get(userHostController.show);
router.route("/:userhId").put(userHostController.update);
router.route("/:userhId").delete(userHostController.destroy);

module.exports = router;
