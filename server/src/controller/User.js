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
        app.post(`${baseUrl}/${name}/profile`, this.profile);
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

    profile(req, res)
    {

    }
}

module.exports = (new User());