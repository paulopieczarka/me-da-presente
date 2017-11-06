const Models = require("../Models.js");
const Wishlist = require("./Wishlist.js");

class User
{
    createRoutes(app, baseUrl)
    {
        const name = "user";
        console.log(`Create router for ${baseUrl}/${name}.`);

        app.post(`${baseUrl}/${name}/signup`, this.signup);
        app.post(`${baseUrl}/${name}/signin`, this.signin);
        app.post(`${baseUrl}/${name}/update`, this.update);
        app.post(`${baseUrl}/${name}/wishlist/remove`, this.removeFromWishlist);
        app.get(`${baseUrl}/${name}/profile/:username`, this.profile);
        app.get(`${baseUrl}/${name}/list`, this.list);
    }

    signup(req, res)
    {
        let { User } = Models;
        let wishlists = Wishlist._getUserDefaultLists();
        const user = new User(req.body);
        user.wishlists = wishlists;
        user.save();

        res.send({ status: "success", result: user.username });
    }

    list(req, res)
    {
        let { User } = Models;
        User.find({}, "_id name username picture", (err, users) => {
            if(err) {
                res.send({ status: "error", result: "Cannot retrive users." });
                return;
            }

            res.send({ status: "success", result: users });
        });
    }

    removeFromWishlist(req, res)
    {
        let { User } = Models;
        console.log(req.body);
        User.findOne({ _id: req.body.userId }, (err, user) => {
            if(err || !user) {
                res.send({ status: "error", result: "Cannot remove product." });
                return;
            }

            user.products.remove(req.body.productId);
            user.save();

            res.send({ status: "success", result: "Product removed." });
        })
    }

    signin(req, res)
    {
        let { User } = Models;
        User.findOne({ username: req.body.username }, (err, user) => {

            if(err || !user) {
                res.send({ status: "error", result: "Username and password not found." });
                return;
            }

            if(user.password === req.body.password) {
                user["password"] = "";
                res.send({ status: "success", result: user });
            }
            else {
                res.send({ status: "error", result: "Wrong password." });
            }

        });
    }

    update(req, res)
    {
        let { User } = Models;
        User.findByIdAndUpdate(
            req.body._id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    birthday: req.body.birthday,
                    username: req.body.username,
                    picture: req.body.picture,
                }
            },
            (err, user) => {
                if(err) {
                    res.send({ status: "error", result: "Cannot update." });
                    return;
                }

                res.send({ status: "success", result: user });
            }
        );
    }

    profile(req, res)
    {
        let { User } = Models;
        User.findOne({ username: req.params.username })
        .populate("wishlists")     
        .exec((err, user) => {
            if(err || user === null) {
                res.send("error");
                return;
            }

            let puclicWithlists = [];
            user.wishlists.forEach(wl => {
                if(wl.privacy === 0) {
                    puclicWithlists.push(wl);
                }
            });

            res.send({
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                username: user.username,
                picture: user.picture,
                wishlists: puclicWithlists,
                signupDate: user.signupDate
            });
        });
    }
}

module.exports = (new User());