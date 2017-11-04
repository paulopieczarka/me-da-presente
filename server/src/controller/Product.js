const mongoose = require('mongoose');
const Controller = require("./Controller");
const Models = require("../Models.js");

class Product extends Controller
{
    constructor() {
        super("product");
    }

    createRoutes(app, baseRoute) 
    {
        // super.createRoutes(app, baseRoute);
        console.log("Create router for /api/product.");
        app.post(`${baseRoute}/${this.name}/add`, this._add);
        app.get(`${baseRoute}/${this.name}/list`, this.list);
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

    list(req, res)
    {
        let { Product } = Models;
        Product.find({})
            .populate("category")
            // .populate("picture")
            .exec((err, products) => {
                res.send(products);
            });
    }
}

module.exports = (new Product());