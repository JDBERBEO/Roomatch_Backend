const router = require("express").Router();
const adverController = require("../controllers/spaAdverController.js");
const { auth } = require("../utils/middlewares");

router.route("/").post(auth, adverController.create);
router.route("/hostAd/").get(auth, adverController.list);
router.route("/:filterAd/?selectedDays").get(adverController.showAll);
router.route("/:adverId").put(adverController.update);
router.route("/:adverId").get(adverController.show);
router.route("/:adverId").delete(adverController.destroy);

module.exports = router;
