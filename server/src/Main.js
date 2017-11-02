const express = require('express');
const cors = require('cors');

const mongoose = require('./Database');
const Category = require("./controller/Category");

const app = express();
app.use(cors());


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Ops! Janus cannot reach the Mongoose.'));
db.once('open', function() {
    console.log("Janus and the Mongoose are connected!");
    Start();
});

var Start = () =>
{
    // Category.seedData();
    
    // Routes.
    Category.createRoutes(app, "/api");
    
    app.get('/api/products', function (req, res) {
        res.send(products);
    })
    
    app.listen(8000, function () {
        console.log("Servidor Janus is runnning at 8000.")
    })
};

