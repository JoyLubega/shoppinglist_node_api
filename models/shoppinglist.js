const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppinglistSchema = new Schema({
    name: { type: String},
    description: { type : String},
    date_added: { type : String},
    date_updated: { type : String},
    items:[{type: Schema.Types.ObjectId, ref: "Item"}],
});
const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);

module.exports = Shoppinglist;