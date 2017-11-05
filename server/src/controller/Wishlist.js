const Models = require("../Models.js");

class Wishlist
{
    createRoutes(app, baseUrl)
    {
        const name = "wishlist";
        console.log(`Create router for ${baseUrl}/${name}.`);

        app.post(`${baseUrl}/${name}/add`, this.add);
        app.post(`${baseUrl}/${name}/:uid`, this.get);
        app.post(`${baseUrl}/${name}/options/:userid`, this.getOptions);
        app.get(`${baseUrl}/${name}/list`, this.list);
    }

    add(req, res)
    {
        let { WishlistProduct, Wishlist, User } = Models;

        User.findOne({ _id: req.body.user })
        .populate("wishlists")
        .exec((err, user) => {
            if(err) {
                res.send({ status: "error", result: "Cannot find user." })
                return;
            }

            let wishlistProduct = new WishlistProduct({
                product: req.body.product,
                price: req.body.price,
                love: req.body.love
            });

            wishlistProduct.save();

            Wishlist.findOne({ _id: req.body.wishlist }, (err, wishlist) => {
                if(err) {
                    res.send({ status: "error", result: "Cannot find wishlist." })
                    return;
                }

                wishlist.products.push(wishlistProduct);
                wishlist.save();

                res.send({ status: "success", result: "Product added to wishlist." });
            });
        });
    }

    list(req, res)
    {
        res.send("SUCCESS");
    }

    get(req, res)
    {
        let { Wishlist } = Models;
        Wishlist.findOne({ _id: req.params.uid })
        .populate("products")
        .exec((err, list) => {
            if(err) {
                res.send({ status: "error", result: "Cannot retrive wishtlist." });
                return;
            }

            list.views += 1;
            list.save();

            res.send({ status: "success", result: list });
        });
    }

    getOptions(req, res)
    {
        let { User } = Models;
        User.findOne({ _id: req.params.userid }, "_id wishlists")
        .populate("wishlists")
        .exec((err, data) => {
            if(err || !data) {
                res.send({ status: "error", result: "Unable to retrive wishlists." });
                return;
            }

            let userWishlists = data.wishlists.map(({_id, name, description, color, views}) => ({
                _id: _id,
                name: name,
                description: description,
                color: color,
                views: views
            }));

            res.send({ status: "success", result: userWishlists });
        });
    }

    _getUserDefaultLists()
    {
        let { Wishlist } = Models;
        
        const favorites = new Wishlist({
            name: "Favorites",
            description: "My favorite items.",
            color: "#F44336",
            privacy: 0
        });

        const personal = new Wishlist({
            name: "Personal",
            description: "My personal list.",
            color: "#9C27B0",
            privacy: 2
        });

        const petneeds = new Wishlist({
            name: "Pet Needs",
            description: "Pet my pet.",
            color: "#673AB7",
            privacy: 1
        });

        favorites.save();
        personal.save();
        petneeds.save();

        return [favorites._id, personal._id, petneeds._id];
    }
}

module.exports = (new Wishlist());