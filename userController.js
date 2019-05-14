// Import contact model
User = require("./userModel");
Relation = require("./relationModel");
moment = require("moment");

// Handle index actions
exports.index = function(req, res) {
    User.find()
        .limit(2)
        .exec(function(err, contacts) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: contacts
            });
        });
};

// Handle create contact actions
exports.new = function(req, res) {
    var user = new User();
    user.first_name = req.body.first_name ? req.body.first_name : contact.first_name;
    user.last_name = req.body.gender;
    user.gender = req.body.gender;
    user.birthday = req.body.birthday;

    // save the contact and check for errors
    user.save(function(err) {
        // if (err)
        //     res.json(err);

        res.json({
            message: "New user created!",
            data: contact
        });
    });
};

// Handle view contact info
exports.view = function(req, res) {
    User.findById(req.params._id, function(err, contact) {
        if (err) res.send(err);
        res.json({
            message: "Contact details loading..",
            data: contact
        });
    });
};

// Handle update contact info
exports.update = function(req, res) {
    User.findById(req.params.contact_id, function(err, user) {
        if (err) res.send(err);

        user.first_name = req.body.first_name ? req.body.first_name : contact.first_name;
        user.last_name = req.body.gender;
        user.gender = req.body.gender;
        user.birthday = req.body.birthday;

        // save the contact and check for errors
        user.save(function(err) {
            if (err) res.json(err);
            res.json({
                message: "Contact Info updated",
                data: contact
            });
        });
    });
};

// Handle delete contact
exports.delete = function(req, res) {
    User.remove(
        {
            _id: req.params._id
        },
        function(err, contact) {
            if (err) res.send(err);

            res.json({
                status: "success",
                message: "Contact deleted"
            });
        }
    );
};

exports.getCards = function(req, res) {
    let user = req.body.user;

    /// query 1 - swipes dados pelo user - para nao aparecer novamente
    let query1 = { _id: user._id };

    Relation.findOne(query1, function(err, doc) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }

        let swipes = [];

        if (doc !== null) {
            doc = doc.toObject();
            swipes = swipes
                .concat(doc.like || [])
                .concat(doc.superlike || [])
                .concat(doc.dislike || []);
        }

        swipes = swipes.concat(user._id);

        const ageRange0 = user.ageRange[0] || 18;
        const ageRange1 = user.ageRange[1] || 100;

        const dateRange0 = moment()
            .subtract(ageRange0, "years")
            .toDate();
        const dateRange1 = moment()
            .subtract(ageRange1, "years")
            .toDate();

        /// query2 - cards que correspondem aos filtros

        let query2 = {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [user.location.coordinates[0], user.location.coordinates[1]]
                    },
                    $maxDistance: user.distance * 1000
                }
            },
            showMe: true,
            birthday: {
                $gt: dateRange1,
                $lte: dateRange0
            },
            _id: { $nin: swipes }
        };

        if (user.gender === "Male") {
            query2.showMen = true;
        }
        if (user.gender === "Female") {
            query2.showWomen = true;
        }

        if (user.showMen && !user.showWomen) {
            query2.gender = "Male";
        } else if (user.showWomen && !user.showMen) {
            query2.gender = "Female";
        }

        const options = { birthday: 1, first_name: 1, bio: 1, _id: 1, image: 1, location: 1 };

        User.find(query2, options, function(err, results) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            }

            console.log(results.length);
            res.json({
                status: "success",
                message: "Cards retrieved successfully",
                data: results,
                count: results.length
            });
        });
    });
};
