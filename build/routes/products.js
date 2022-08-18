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
var Product = require('../models/product').Product;
var express = require('express');
var Category = require('../models/category').Category;
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var ProductsRoute = /** @class */ (function () {
    function ProductsRoute() {
        this.productroute();
    }
    ProductsRoute.prototype.productroute = function () {
        var _this = this;
        var FILE_TYPE_MAP = {
            'image/png': 'png',
            'image/jpeg': 'jpeg',
            'image/jpg': 'jpg',
        };
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                var isValid = FILE_TYPE_MAP[file.mimetype];
                var uploadError = new Error('invalid image type');
                if (isValid) {
                    uploadError = null;
                }
                cb(uploadError, 'public/uploads');
            },
            filename: function (req, file, cb) {
                var fileName = file.originalname.split(' ').join('-');
                var extension = FILE_TYPE_MAP[file.mimetype];
                cb(null, "".concat(fileName, "-").concat(Date.now(), ".").concat(extension));
            },
        });
        var uploadOptions = multer({ storage: storage });
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filter, productList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = {};
                        if (req.query.categories) {
                            filter = { category: req.query.categories.split(',') };
                        }
                        return [4 /*yield*/, Product.find(filter).populate('category')];
                    case 1:
                        productList = _a.sent();
                        if (!productList) {
                            res.status(500).json({ success: false });
                        }
                        res.send(productList);
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product.findById(req.params.id).populate('category')];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            res.status(500).json({ success: false });
                        }
                        res.send(product);
                        return [2 /*return*/];
                }
            });
        }); });
        router.post("/", uploadOptions.single('image'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category, file, fileName, basePath, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Category.findById(req.body.category)];
                    case 1:
                        category = _a.sent();
                        if (!category)
                            return [2 /*return*/, res.status(400).send('Invalid Category')];
                        file = req.file;
                        if (!file)
                            return [2 /*return*/, res.status(400).send('No image in the request')];
                        fileName = file.filename;
                        basePath = "".concat(req.protocol, "://").concat(req.get('host'), "/public/uploads/");
                        product = new Product({
                            name: req.body.name,
                            description: req.body.description,
                            richDescription: req.body.richDescription,
                            image: "".concat(basePath).concat(fileName),
                            brand: req.body.brand,
                            price: req.body.price,
                            category: req.body.category,
                            countInStock: req.body.countInStock,
                            rating: req.body.rating,
                            numReviews: req.body.numReviews,
                            isFeatured: req.body.isFeatured,
                        });
                        return [4 /*yield*/, product.save()];
                    case 2:
                        product = _a.sent();
                        if (!product)
                            return [2 /*return*/, res.status(500).send('The product cannot be created')];
                        res.send(product);
                        return [2 /*return*/];
                }
            });
        }); });
        router.put('/:id', uploadOptions.single('image'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var category, product, file, imagepath, fileName, basePath, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose.isValidObjectId(req.params.id)) {
                            return [2 /*return*/, res.status(400).send('Invalid Product Id')];
                        }
                        return [4 /*yield*/, Category.findById(req.body.category)];
                    case 1:
                        category = _a.sent();
                        if (!category)
                            return [2 /*return*/, res.status(400).send('Invalid Category')];
                        return [4 /*yield*/, Product.findById(req.params.id)];
                    case 2:
                        product = _a.sent();
                        if (!product)
                            return [2 /*return*/, res.status(400).send('Invalid Product!')];
                        file = req.file;
                        if (file) {
                            fileName = file.filename;
                            basePath = "".concat(req.protocol, "://").concat(req.get('host'), "/public/uploads/");
                            imagepath = "".concat(basePath).concat(fileName);
                        }
                        else {
                            imagepath = product.image;
                        }
                        return [4 /*yield*/, Product.findByIdAndUpdate(req.params.id, {
                                name: req.body.name,
                                description: req.body.description,
                                richDescription: req.body.richDescription,
                                image: imagepath,
                                brand: req.body.brand,
                                price: req.body.price,
                                category: req.body.category,
                                countInStock: req.body.countInStock,
                                rating: req.body.rating,
                                numReviews: req.body.numReviews,
                                isFeatured: req.body.isFeatured,
                            }, { new: true })];
                    case 3:
                        updatedProduct = _a.sent();
                        if (!updatedProduct)
                            return [2 /*return*/, res.status(500).send('the product cannot be updated!')];
                        res.send(updatedProduct);
                        return [2 /*return*/];
                }
            });
        }); });
        router.delete('/:id', function (req, res) {
            Product.findByIdAndRemove(req.params.id)
                .then(function (product) {
                if (product) {
                    return res
                        .status(200)
                        .json({
                        success: true,
                        message: 'the product is deleted!',
                    });
                }
                else {
                    return res
                        .status(404)
                        .json({ success: false, message: 'product not found!' });
                }
            })
                .catch(function (err) {
                return res.status(500).json({ success: false, error: err });
            });
        });
        router.get("/get/count", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product.countDocuments(function (count) { return count; })];
                    case 1:
                        productCount = _a.sent();
                        if (!productCount) {
                            res.status(500).json({ success: false });
                        }
                        res.send({
                            productCount: productCount,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/get/featured/:count", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var count, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = req.params.count ? req.params.count : 0;
                        return [4 /*yield*/, Product.find({ isFeatured: true }).limit(+count)];
                    case 1:
                        products = _a.sent();
                        if (!products) {
                            res.status(500).json({ success: false });
                        }
                        res.send(products);
                        return [2 /*return*/];
                }
            });
        }); });
        router.put('/gallery-images/:id', uploadOptions.array('images', 10), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var files, imagesPaths, basePath, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose.isValidObjectId(req.params.id)) {
                            return [2 /*return*/, res.status(400).send('Invalid Product Id')];
                        }
                        files = req.files;
                        imagesPaths = [];
                        basePath = "".concat(req.protocol, "://").concat(req.get('host'), "/public/uploads/");
                        if (files) {
                            files.map(function (file) {
                                imagesPaths.push("".concat(basePath).concat(file.filename));
                            });
                        }
                        return [4 /*yield*/, Product.findByIdAndUpdate(req.params.id, {
                                images: imagesPaths,
                            }, { new: true })];
                    case 1:
                        product = _a.sent();
                        if (!product)
                            return [2 /*return*/, res.status(500).send('the gallery cannot be updated!')];
                        res.send(product);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ProductsRoute;
}());
var route = new ProductsRoute;
module.exports = router;
//# sourceMappingURL=products.js.map