const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    address: { type: [String], default: [] },
    inn: { type: String },
    vat: { type: String },
    createdDate: { type: Date, default: Date.now },
});

module.exports =mongoose.model('Customer', schema);