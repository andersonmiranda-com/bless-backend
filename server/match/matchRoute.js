const router = require("express").Router();
const matchController = require("./matchController");

router.route("/save").post(matchController.save);

module.exports = router;
