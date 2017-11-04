const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: String,
    birthday: Schema.Types.Date,
    email: {type: String, unique: true },
    username: {type: String, unique: true },
    password: String,
    picture: { type: Schema.Types.ObjectId, ref: "Images" },
    signupDate: { type: Date, default: Date.now },
    social: { type: Schema.Types.ObjectId, ref: "Social" },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: "Wishlist" }]
});

var socialSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    facebook: String,
    twitter: String,
    github: String
});

var wishlistSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: String,
    description: String,
    color: String,
    privacy: Number,
    views: Number,
    products: [{ type: Schema.Types.ObjectId, ref: "WishlistProduct" }]
});

var productSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: String,
    description: String,
    picture: { type: Schema.Types.ObjectId, ref: "Images" },
    category: { type: Schema.Types.ObjectId, ref: "Category" }
});

var wishlistProductSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    price: Number,
    links: [String]
});

var categorySchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: { type: String, unique: true, lowercase: true }
});

var imagesSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    contentType: String,
    size: Number,
    img: Buffer
});

const Models = {
    User: mongoose.model("User", userSchema),
    Social: mongoose.model("Social", socialSchema),
    Wishlist: mongoose.model("Wishlist", wishlistSchema),
    WishlistProduct: mongoose.model("WishlistProduct", wishlistProductSchema),
    Product: mongoose.model("Product", productSchema),
    Category: mongoose.model("Category", categorySchema),
    Images: mongoose.model("Images", imagesSchema)
};

module.exports = Models;