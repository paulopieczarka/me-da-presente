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
        app.post(`${baseRoute}/${this.name}/remove`, this.remove);
        app.post(`${baseRoute}/${this.name}/update`, this.update);
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

    remove(req, res)
    {
        let { Product } = Models;
        Product.findByIdAndRemove(req.body.id, (err, result) => {
            if(err) {
                res.send({ status: "error", result: "Cannot remove product." });
                return;
            }

            Models.WishlistProduct.find({ product: req.body.id }, (err, wishProduct) => {
                wishProduct.forEach(wp => {
                    Models.Wishlist.find({}, (err2, wishlist) => {
                        wishlist.forEach(w => {
                            w.products.remove(wp._id);
                            w.save();
                        });
                    });
                });
            });

            res.send({ status: "success", result: "Product removed."});
        });
    }

    update(req, res)
    {
        let { Product } = Models;
        Product.findByIdAndUpdate(
            req.body._id, 
            {
                $set: { 
                    name: req.body.name, 
                    description: req.body.description, 
                    category: req.body.category 
                }
            },
            (err, product) => {
                if(err) {
                    res.send({ status: "error", result: "Cannot update." });
                    return;
                }

                res.send({ status: "success", result: product });
            }
        )
    }
}

module.exports = (new Product());