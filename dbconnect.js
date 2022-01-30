const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/chat";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
