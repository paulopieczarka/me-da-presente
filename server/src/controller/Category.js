const mongoose = require('mongoose');
const Controller = require("./Controller");
const Models = require("../Models.js");

class Category extends Controller
{
    constructor() {
        super("category");
    }

    _add(name) {
        const { Category } = Models;
        (new Category({ name: name })).save(err => super._throwError(err));
    }

    _get(id, callback) 
    {
        const { Category } = Models;
        Category.findOne({ "_id": id }, '_id  name', (err, categories) => {
            if(err) {
                super.throwError(err);
                return;
            }
            
            callback(categories);
        });
    }

    byId(res, params) {
        this._get(params.value, (result) => res.send(result));
    }

    byName(res, params)
    {
        const { Category } = Models;
        Category.findOne({ "name": params.value }, '_id  name', (err, categories) => {
            if(err) {
                super.throwError(err);
                return;
            }
            
            res.send(categories);
        });
    }

    list(res)
    {
        const { Category } = Models;
        Category.find({}, (err, categories) => {
            if(err) {
                this.throwError(err);
                return;
            }
            
            res.send(categories);
        });
    }

    _seedData() {
        this._add("froyo");
    }
}

module.exports = (new Category());