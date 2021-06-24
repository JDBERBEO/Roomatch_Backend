const router = require("express").Router();
const adverController = require("../controllers/spaAdverController.js");

router.route("/:hostId").post(adverController.create);
router.route("/").get(adverController.list);
router.route("/:userId").get(adverController.show);
router.route("/:userId").put(adverController.update);
router.route("/:userId").delete(adverController.destroy);

module.exports = router;
