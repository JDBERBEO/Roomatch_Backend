const router = require("express").Router();
const inspectorController = require("../controllers/inspectorController");

router.route("/signup").post(inspectorController.signup);
router.route("/login").post(inspectorController.login);

module.exports = router;
