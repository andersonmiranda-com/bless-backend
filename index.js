let mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./config/express");

// Connect to Mongoose and set connection variable
//mongoose.connect("mongodb://localhost/bless", { useNewUrlParser: true });

mongoose.connect(
    "mongodb+srv://andersonmiranda:6jxHNO7KHO3FeRXE@cluster0-dx3cd.mongodb.net/bless",
    { useNewUrlParser: true }
);

var db = mongoose.connection;
var port = process.env.PORT || 3000;


app.listen(port, function() {
    console.log("Running Bless Backend Server on port " + port);
});
