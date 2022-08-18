//@ts-nocheck 
var mongo = require('mongoose');
var orderItemSchema = mongo.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Product'
    }
});
exports.OrderItem = mongo.model('OrderItem', orderItemSchema);
//# sourceMappingURL=order-item.js.map