const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('./Database');
const Category = require("./controller/Category");
const Product = require("./controller/Product");

const UploadController = require("./controller/Upload");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ops! Janus cannot reach the Mongoose.'));
db.once('open', function() {
    console.log("Janus and the Mongoose are connected!");
    Start();
});

var Start = () =>
{
    // Category._seedData();
    
    // Routes.
    Category.createRoutes(app, "/api");
    Product.createRoutes(app, "/api");

    UploadController(app, "/api"); // Add upload controller.
    
    app.get('/api/products', function (req, res) {
        res.send(products);
    })
    
    app.listen(8000, function () {
        console.log("Servidor Janus is runnning at 8000.")
    })
};

