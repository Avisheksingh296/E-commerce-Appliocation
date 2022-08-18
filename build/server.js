"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck 
var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var authJwt = require('./helpers/jwt');
var errorHandler = require('./helpers/error-handler');
app.use(cors());
app.options('*', cors());
//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);
//Routes
var categoriesRoutes = require('./routes/categories');
var productsRoutes = require('./routes/products');
var usersRoutes = require('./routes/users');
var ordersRoutes = require('./routes/orders');
var api = "/api/v1";
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/orders", ordersRoutes);
//Database
mongoose.connect("mongodb+srv://nitish:rajputana22%4022@cluster0.1vaom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce-database'
})
    .then(function () {
    console.log('Database Connection is ready...');
})
    .catch(function (err) {
    console.log(err);
});
//Server
app.listen(3002, function () {
    console.log('server is running http://localhost:3002');
});
//# sourceMappingURL=server.js.map