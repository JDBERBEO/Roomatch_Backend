const router = require("express").Router();
const adverController = require("../controllers/spaAdverController.js");

router.route("/:hostId").post(adverController.create);
<<<<<<< HEAD
router.route("/host/:hostId").get(adverController.list);
router.route("/:adverId").get(adverController.show);
router.route("/:adverId").put(adverController.update);
router.route("/:adverId").delete(adverController.destroy);
=======
router.route("/").get(adverController.list);
router.route("/:adverId").get(adverController.show);
router.route("/:userId").put(adverController.update);
router.route("/:userId").delete(adverController.destroy);
>>>>>>> develop

module.exports = router;
