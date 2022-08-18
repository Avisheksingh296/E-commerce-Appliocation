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
var User = require('../models/user').User;
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var UsersRoutes = /** @class */ (function () {
    function UsersRoutes() {
        this.userroutes();
    }
    UsersRoutes.prototype.userroutes = function () {
        var _this = this;
        router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.find().select('-passwordHash')];
                    case 1:
                        userList = _a.sent();
                        if (!userList) {
                            res.status(500).json({ success: false });
                        }
                        res.send(userList);
                        return [2 /*return*/];
                }
            });
        }); });
        router.get('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.findById(req.params.id).select('-passwordHash')];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(500).json({ message: 'The user with the given ID was not found.' });
                        }
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            passwordHash: bcrypt.hashSync(req.body.password, 10),
                            phone: req.body.phone,
                            isAdmin: req.body.isAdmin,
                            street: req.body.street,
                            apartment: req.body.apartment,
                            zip: req.body.zip,
                            city: req.body.city,
                            country: req.body.country,
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).send('the user cannot be created!')];
                        res.send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        router.put('/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userExist, newPassword, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.findById(req.params.id)];
                    case 1:
                        userExist = _a.sent();
                        if (req.body.password) {
                            newPassword = bcrypt.hashSync(req.body.password, 10);
                        }
                        else {
                            newPassword = userExist.passwordHash;
                        }
                        return [4 /*yield*/, User.findByIdAndUpdate(req.params.id, {
                                name: req.body.name,
                                email: req.body.email,
                                passwordHash: newPassword,
                                phone: req.body.phone,
                                isAdmin: req.body.isAdmin,
                                street: req.body.street,
                                apartment: req.body.apartment,
                                zip: req.body.zip,
                                city: req.body.city,
                                country: req.body.country,
                            }, { new: true })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).send('the user cannot be created!')];
                        res.send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, secret, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        secret = "I-love-my-dog";
                        if (!user) {
                            return [2 /*return*/, res.status(400).send('The user not found')];
                        }
                        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
                            token = jwt.sign({
                                userId: user.id,
                                isAdmin: user.isAdmin
                            }, secret, { expiresIn: '1w' });
                            res.status(200).send({ user: user.email, token: token });
                        }
                        else {
                            res.status(400).send('password is wrong!');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/register', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            passwordHash: bcrypt.hashSync(req.body.password, 10),
                            phone: req.body.phone,
                            isAdmin: req.body.isAdmin,
                            street: req.body.street,
                            apartment: req.body.apartment,
                            zip: req.body.zip,
                            city: req.body.city,
                            country: req.body.country,
                        });
                        return [4 /*yield*/, user.save()];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).send('the user cannot be created!')];
                        res.send(user);
                        return [2 /*return*/];
                }
            });
        }); });
        router.delete('/:id', function (req, res) {
            User.findByIdAndRemove(req.params.id).then(function (user) {
                if (user) {
                    return res.status(200).json({ success: true, message: 'the user is deleted!' });
                }
                else {
                    return res.status(404).json({ success: false, message: "user not found!" });
                }
            }).catch(function (err) {
                return res.status(500).json({ success: false, error: err });
            });
        });
        router.get("/get/count", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.countDocuments(function (count) { return count; })];
                    case 1:
                        userCount = _a.sent();
                        if (!userCount) {
                            res.status(500).json({ success: false });
                        }
                        res.send({
                            userCount: userCount
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return UsersRoutes;
}());
var route = new UsersRoutes;
module.exports = router;
//# sourceMappingURL=users.js.map