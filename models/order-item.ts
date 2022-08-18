//@ts-nocheck 
const mongo = require('mongoose');

const orderItemSchema = mongo.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

exports.OrderItem = mongo.model('OrderItem', orderItemSchema);

