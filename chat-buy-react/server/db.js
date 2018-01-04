import mongoose from "mongoose";
import config from "./config";

// Control the number of connections to the mongonDB
let retryCount = 1;

// mongoose.Promise = global.Promise;
mongoose.Promise = require("bluebird");

const connections = mongoose.connection;
const logger = console;

connections.on('connecting', () => {
	logger.info('connecting to mongonDB...',  config.DEV_DB_URL)
})
connections.on('error', (err) => {
	logger.error('Error in connecting mongonDB', config.DEV_DB_URL, err)
})
connections.on('connected', () => {
	logger.info("mongonDB connected", config.DEV_DB_URL)
})
connections.once('open', function() {
	logger.info('MongoDB connection opened!', config.DEV_DB_URL);
});
connections.on('reconnected', function () {
	logger.info('MongoDB reconnected!', config.DEV_DB_URL);
});
connections.on('disconnected', function() {
	logger.info('MongoDB disconnected!', config.DEV_DB_URL);
	// auto reconnect
	if (retryCount < 100) {
		mongoose.connect(config.DEV_DB_URL, { useMongoClient: true });
		retryCount ++;
	}
});
mongoose.connect(config.DEV_DB_URL, { useMongoClient: true });
