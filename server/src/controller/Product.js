const mongoose = require('mongoose');
const Controller = require("./Controller");
const Models = require("../Models.js");

class Product extends Controller
{
    constructor() {
        super("product");
    }

    createRoutes(app, basicRoute) 
    {
        super.createRoutes(app, basicRoute);

        console.log("POST ROUTES AT WORK.");
        app.post(`${basicRoute}/${this.name}/add`, this._add);
    }

    _add(req, res)
    {
        let productData = req.body;
        let { Product } = Models;

        (new Product(productData)).save(err => {
            if(!err) {
                res.send({ status: "ERROR", result: err });
                return;
            }

            res.send({ status: "SUCCESS" });
        });
    }
}

module.exports = (new Product());