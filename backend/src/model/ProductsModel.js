const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
    name: {type: String},
    description: {type: String, default: ''},
    categoryId: {type: String},
    netPrice: {type: Number},
    taxRate: { type: Number },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Products', ProductsSchema);