var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var DB_URL = 'mongodb://localhost/chat-buy-react'
mongoose.connect(DB_URL, {useMongoClient:true})

const models = {
    user: {
        user: {type: String, require: true},
        pwd: {type: String, require: true},
        type: {type: String, require: true},
        orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'allOrders'}]
    },
    goods: {
        name: {type: String, require: true},
        id: {type: Number, require: true},
        price: {type: Number, require: true},
    },
    allOrders: {
        orderId: {type: Number, require: true},
        price: {type: Number, require: true},
        desc: {type: String, require: true},
        count: {type: Number, require: true},
        state: {type: Number, require: true},
        date: {type: Date, require: true, default: Date.now()},
        customerId: {type: String, require: true},
        deliverId: {type: Number},
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