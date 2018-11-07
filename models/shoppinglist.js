const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppinglistSchema = new Schema({
    name: { type: String},
    description: { type : String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    items:[{type: Schema.Types.ObjectId, ref: "Item"}],
});
const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);

module.exports = Shoppinglist;