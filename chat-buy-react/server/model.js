var mongoose = require('mongoose')
var DB_URL = 'mongodb://localhost/chat-buy-react'
mongoose.connect(DB_URL, {useMongoClient:true})

const models = {
    user: {
        user: {type: String, require: true},
        pwd: {type: String, require: true},
        type: {type: String, require: true},
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}