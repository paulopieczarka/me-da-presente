const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const products = {
    exclusives: [
        { id: "1fasjnfj43fdsnjdnj", name: "Banana Book Pro 15", description: "I'll love something expensive", price: 6340.32 },
        { id: "2fadssjnfj43njdnj", name: "Banana Book Pro 14", description: "I'll love something expensive", price: 6340.32 },
        { id: "3fasjddsnfj43njdnj", name: "Banana Book Pro 13", description: "I'll love something expensive", price: 6340.32 },
        { id: "4fasjnfj43sanjdnj", name: "Banana Book Pro 12", description: "I'll love something expensive", price: 6340.32 },
        { id: "5fasjnfsajgfg43njdnj", name: "Banana Book Pro 11", description: "I'll love something expensive", price: 6340.32 },
        { id: "6fasjnfj43dsanjdnj", name: "Banana Book Pro 10", description: "I'll love something expensive", price: 6340.32 },
        { id: "7fassdajnfj43njdnj", name: "Banana Book Pro 9", description: "I'll love something expensive", price: 6340.32 }
    ]
};

// console.log(firebase);

app.get('/api/products', function (req, res) {
    res.send(products);
})

app.listen(8000, function () {
    console.log("Servidor Janus is runnning at 8000.")
})