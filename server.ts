//@ts-nocheck 
const express = require('express'); 
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
import * as dotenv from 'dotenv';
dotenv.config();
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = "/api/v1";

app.use(`/api/v1/categories`, categoriesRoutes);
app.use(`/api/v1/products`, productsRoutes);
app.use(`/api/v1/users`, usersRoutes);
app.use(`/api/v1/orders`, ordersRoutes);

//Database
mongoose.connect("mongodb+srv://nitish:rajputana22%4022@cluster0.1vaom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3002, ()=>{
    console.log('server is running http://localhost:3002');
})