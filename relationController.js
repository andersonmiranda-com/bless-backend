// Import contact model
Relation = require("./relationModel");
let mongoose = require("mongoose");

exports.saveRelation = function(req, res) {
    let { user_id, item_id, type } = req.body;
    user_id = mongoose.Types.ObjectId(user_id);
    item_id = mongoose.Types.ObjectId(item_id);

    console.log(user_id, item_id, type);

    //mongoose.connection.db.collection("relations"). acessa o comando nativo do MOngoDB

    Relation.updateOne({ _id: user_id }, { $push: { [type]: item_id } }, { upsert: true }, function(
        err,
        doc
    ) {
        if (err) {
            res.json({ status: "error", message: err });
        }

        Relation.updateOne(
            { _id: item_id },
            { $push: { [type + "Back"]: item_id } },
            { upsert: true },
            function(err, doc) {
                if (err) {
                    res.json({ status: "error", message: err });
                }
                res.json({
                    status: "success"
                });
            }
        );
    });
};
