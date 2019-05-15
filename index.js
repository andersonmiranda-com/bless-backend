let mongoose = require("mongoose");
const config = require("./config/config");
const app = require("./config/express");

// Connect to Mongoose and set connection variable
//mongoose.connect("mongodb://localhost/bless", { useNewUrlParser: true });

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

module.exports = app;
