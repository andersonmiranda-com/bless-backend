var mongoose = require("mongoose");

// Setup schema
var matchSchema = mongoose.Schema({
    match: mongoose.Schema.Types.Mixed,
    createdAt: Date,
    lastMessage: mongoose.Schema.Types.Mixed
});

// Export Contact model
var Match = (module.exports = mongoose.model("match", matchSchema));

module.exports.get = function(callback, limit) {
    Match.find(callback).limit(limit);
};
