const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ShoppinglistSchema = new Schema({
    name: { type: String, required: [true, "Name should not be Empty"], unique:true},
    description: { type : String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    items:[{type: Schema.Types.ObjectId, ref: "Item"}],
});
ShoppinglistSchema.plugin(uniqueValidator, { message: 'The Shoppinglist Name already exists.' });
const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistSchema);

module.exports = Shoppinglist;