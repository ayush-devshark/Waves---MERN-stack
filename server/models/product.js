const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    model: {
        required: [true, 'You need a guitar model'],
        type: String,
        unique: 1,
        maxLength: 250,
    },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    frets: { required: true, type: Number },
    woodtype: { type: String, required: true },
    description: {
        required: [true, 'You need a description'],
        type: String,
        maxLength: 10000,
    },
    price: {
        required: true,
        type: Number,
        maxLength: 255,
    },
    available: {
        required: [true, 'How many of this models we own'],
        type: Number,
        maxLength: 5000,
        default: 0,
    },
    itemSold: {
        type: Number,
        default: 0,
        required: true,
    },
    shipping: {
        type: Boolean,
        required: [true, 'specify if product has free shipping'],
        default: false,
    },
    images: { type: Array, default: [] },
    date: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
