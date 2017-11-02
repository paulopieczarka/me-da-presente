var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/medapresente', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;