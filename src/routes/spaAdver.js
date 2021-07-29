const router = require("express").Router();
const adverController = require("../controllers/spaAdverController.js");
const { auth } = require("../utils/middlewares");

router.route("/").post(auth, adverController.create);
router.route("/").get(adverController.showAll);
router.route("/seeAd/:adverId").get(adverController.show);
router.route("/:adverId").put(adverController.update);
router.route("/:adverId").delete(auth, adverController.destroy);
router.route("/hostAd").get(auth, adverController.list);

module.exports = router;
