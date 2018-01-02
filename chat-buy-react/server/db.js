import mongoose from "mongoose";
import config from "./config";

// mongoose.Promise = global.Promise;
mongoose.Promise = require("bluebird");

try {
	mongoose.connect(config.DB_URL, {
		useMongoClient: true
	})
} catch(e) {
	mongoose.createConnection(config.DB_URL, {
		useMongoClient: true
	})

}
mongoose.connection 
	.once('open', () => console.log("Mongodb connected"))
	.on('error', err => {
		throw err
	})