var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//@ts-nocheck 
var Order = require('../models/order').Order;
var express = require('express');
var OrderItem = require('../models/order-item').OrderItem;
var router = express.Router();
var OrdersRoute = /** @class */ (function () {
    function OrdersRoute() {
        this.orderroute();
    }
    OrdersRoute.prototype.orderroute = function () {
        var _this = this;
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 })];
                    case 1:
                        orderList = _a.sent();
                        if (!orderList) {
                            res.status(500).json({ success: false });
                        }
                        res.send(orderList);
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.findById(req.params.id)
                            .populate('user', 'name')
                            .populate({
                            path: 'orderItems', populate: {
                                path: 'product', populate: 'category'
                            }
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            res.status(500).json({ success: false });
                        }
                        res.send(order);
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderItemsIds, orderItemsIdsResolved, totalPrices, totalPrice, order;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderItemsIds = Promise.all(req.body.orderItems.map(function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
                            var newOrderItem;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        newOrderItem = new OrderItem({
                                            quantity: orderItem.quantity,
                                            product: orderItem.product
                                        });
                                        return [4 /*yield*/, newOrderItem.save()];
                                    case 1:
                                        newOrderItem = _a.sent();
                                        return [2 /*return*/, newOrderItem._id];
                                }
                            });
                        }); }));
                        return [4 /*yield*/, orderItemsIds];
                    case 1:
                        orderItemsIdsResolved = _a.sent();
                        return [4 /*yield*/, Promise.all(orderItemsIdsResolved.map(function (orderItemId) { return __awaiter(_this, void 0, void 0, function () {
                                var orderItem, totalPrice;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, OrderItem.findById(orderItemId).populate('product', 'price')];
                                        case 1:
                                            orderItem = _a.sent();
                                            totalPrice = orderItem.product.price * orderItem.quantity;
                                            return [2 /*return*/, totalPrice];
                                    }
                                });
                            }); }))];
                    case 2:
                        totalPrices = _a.sent();
                        totalPrice = totalPrices.reduce(function (a, b) { return a + b; }, 0);
                        order = new Order({
                            orderItems: orderItemsIdsResolved,
                            shippingAddress1: req.body.shippingAddress1,
                            shippingAddress2: req.body.shippingAddress2,
                            city: req.body.city,
                            zip: req.body.zip,
                            country: req.body.country,
                            phone: req.body.phone,
                            status: req.body.status,
                            totalPrice: totalPrice,
                            user: req.body.user,
                        });
                        return [4 /*yield*/, order.save()];
                    case 3:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, res.status(400).send('the order cannot be created!')];
                        res.send(order);
                        return [2 /*return*/];
                }
            });
        }); });
        router.put('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.findByIdAndUpdate(req.params.id, {
                            status: req.body.status
                        }, { new: true })];
                    case 1:
                        order = _a.sent();
                        if (!order)
                            return [2 /*return*/, res.status(400).send('the order cannot be update!')];
                        res.send(order);
                        return [2 /*return*/];
                }
            });
        }); });
        router.delete('/:id', function (req, res) {
            Order.findByIdAndRemove(req.params.id).then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!order) return [3 /*break*/, 2];
                            return [4 /*yield*/, order.orderItems.map(function (orderItem) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, OrderItem.findByIdAndRemove(orderItem)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, res.status(200).json({ success: true, message: 'the order is deleted!' })];
                        case 2: return [2 /*return*/, res.status(404).json({ success: false, message: "order not found!" })];
                    }
                });
            }); }).catch(function (err) {
                return res.status(500).json({ success: false, error: err });
            });
        });
        router.get('/get/totalsales', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var totalSales;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.aggregate([
                            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
                        ])];
                    case 1:
                        totalSales = _a.sent();
                        if (!totalSales) {
                            return [2 /*return*/, res.status(400).send('The order sales cannot be generated')];
                        }
                        res.send({ totalsales: totalSales.pop().totalsales });
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/get/count", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.countDocuments(function (count) { return count; })];
                    case 1:
                        orderCount = _a.sent();
                        if (!orderCount) {
                            res.status(500).json({ success: false });
                        }
                        res.send({
                            orderCount: orderCount
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/get/userorders/:userid", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userOrderList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order.find({ user: req.params.userid }).populate({
                            path: 'orderItems', populate: {
                                path: 'product', populate: 'category'
                            }
                        }).sort({ 'dateOrdered': -1 })];
                    case 1:
                        userOrderList = _a.sent();
                        if (!userOrderList) {
                            res.status(500).json({ success: false });
                        }
                        res.send(userOrderList);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return OrdersRoute;
}());
var route = new OrdersRoute;
module.exports = router;
//# sourceMappingURL=orders.js.map