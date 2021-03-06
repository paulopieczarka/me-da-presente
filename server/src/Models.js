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
    color: { type: String, default: "#20A0FF"},
    privacy: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    products: [{ type: Schema.Types.ObjectId, ref: "WishlistProduct" }]
});

var productSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    name: String,
    description: String,
    picture: { type: Schema.Types.ObjectId, ref: "Images" },
    category: { type: Schema.Types.ObjectId, ref: "Category" }
});

// Cascade delete.
// productSchema.pre('remove', next => {
//     console.log("Removing.. ", this._id);
//     Models.WishlistProduct.remove({ product: this._id }, next);    
// });


var wishlistProductSchema = Schema({
    _id: {type: Schema.Types.ObjectId, auto: true},
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    price: Number,
    love: Number,
    links: [String]
});

// wishlistProductSchema.pre("remove", next => {
//     Models.User.find({})
//     .populate("wishlists wishlists.products")
//     .exec((err, user) => {
//         if(err) {
//             return;
//         }

//         console.log("Removing things from..", this._id);

//         Models.User.update({ 
//             _id: user._id
//         }, {
//             $pullAll: {
//                 products: this._id
//             }
//         });
//     });
// });

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

var Models = {
    User: mongoose.model("User", userSchema),
    Social: mongoose.model("Social", socialSchema),
    Wishlist: mongoose.model("Wishlist", wishlistSchema),
    WishlistProduct: mongoose.model("WishlistProduct", wishlistProductSchema),
    Product: mongoose.model("Product", productSchema),
    Category: mongoose.model("Category", categorySchema),
    Images: mongoose.model("Images", imagesSchema)
};

module.exports = Models;