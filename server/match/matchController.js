// Import contact model
const Match = require("./matchModel");
const mongoose = require("mongoose");

exports.save = function(req, res) {
    let { userId, itemId } = req.body;
    //userId = mongoose.Types.ObjectId(userId);
    //itemId = mongoose.Types.ObjectId(itemId);

    console.log("match",userId, itemId);

    Match.create({ match: [userId, itemId] })
        .then(res => res.json({ status: "ok" }))
        .catch(err => res.json({ status: "error", message: err }));
};
