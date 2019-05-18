// Initialize express router
const router = require("express").Router();
const config = require("./config/config");
const userRoutes = require("./server/user/userRoute");
const relationRoutes = require("./server/relation/relationRoute");
const matchRoutes = require("./server/match/matchRoute");

// Set default API response
router.get("/", function(req, res) {
    res.json({
        status: "API Its Working",
        message: "Welcome to Bless Backend Server"
    });
});

router.get("/env", (req, res) => res.json(config));

router.use("/users", userRoutes);
router.use("/relations", relationRoutes);
router.use("/matches", matchRoutes);

// Export API routes
module.exports = router;
