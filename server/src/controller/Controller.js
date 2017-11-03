class Controller
{
    constructor(name) {
        this.name = name;
    }

    createRoutes(app, basicRoute) 
    {
        // var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        // console.log(propertyNames);

        console.log("Route: ", `${basicRoute}/${this.name}`, this);

        app.get(`${basicRoute}/${this.name}/:method/:value?`, (req, res) => {

            if(req.params.method.startsWith("_")){
                res.send("Error 404!");
                return;
            }

            const func = (this[req.params.method]).bind(this);
            if(func) {
                func(res, req.params);
                return;
            }

            res.send("Error 404!");
        });
    }

    _throwError(error) {
        if(error) {
            console.error(`[Controller.${this.name}]: `, error);
        }
    }
}

module.exports = Controller;