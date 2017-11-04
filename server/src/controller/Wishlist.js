const Models = require("../Models.js");

class Wishlist
{
    createRoutes(app, baseUrl)
    {
        const name = "wishlist";
        console.log(`Create router for ${baseUrl}/${name}.`);

        app.post(`${baseUrl}/${name}/add`, this.add);
        app.get(`${baseUrl}/${name}/list`, this.list);
    }

    add(req, res)
    {
        res.send("SUCCESS");
    }

    list(req, res)
    {
        res.send("SUCCESS");
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