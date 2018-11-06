const mongoose = require('mongoose');

var Shoppinglist = mongoose.model('shoppinglists',{
    name: { type: String},
    description: { type : String},
    date_added: { type : String},
    date_updated: { type : String}
});

module.exports = { Shoppinglist };