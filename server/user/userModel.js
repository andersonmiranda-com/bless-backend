var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
   
});

// Export Contact model
var User = module.exports = mongoose.model('user', userSchema);

