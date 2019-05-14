// Initialize express router
let router = require("express").Router();

// Set default API response
router.get("/", function(req, res) {
    res.json({
        status: "API Its Working",
        message: "Welcome to Bless Backend Server"
    });
});

// Import contact controller
var userController = require("./userController");

// Contact routes
router
    .route("/users")
    .get(userController.index)
    .post(userController.new);

router
    .route("/users/:_id")
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route("/getCards").post(userController.getCards);

// Export API routes
module.exports = router;
