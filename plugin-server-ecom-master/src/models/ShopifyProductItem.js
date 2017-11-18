
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var ShopifyProductItem = new Schema({
  item: {
    type: String
  },

},{
    collection: 'items'
});

module.exports = mongoose.model('ShopifyProductItem', ShopifyProductItem);