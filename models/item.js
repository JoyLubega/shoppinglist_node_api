const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String},
    list:{type: Schema.Types.ObjectId, ref: "Shoppinglist"}

});
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;