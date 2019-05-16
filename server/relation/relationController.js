// Import contact model
const Relation = require("./relationModel");
const mongoose = require("mongoose");

exports.save = function(req, res) {
    let { user_id, item_id, type } = req.body;
    user_id = mongoose.Types.ObjectId(user_id);
    item_id = mongoose.Types.ObjectId(item_id);

    //console.log(user_id, item_id, type);

    //mongoose.connection.db.collection("relations"). acessa o comando nativo do MOngoDB
    Relation.updateOne(
        { _id: user_id },
        { $push: { swipes: { uid: item_id, type: type } } },
        { upsert: true }
    )
        .then(res => res.json({ status: "ok" }))
        .catch(err => res.json({ status: "error", message: err }));

};
