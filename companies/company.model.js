const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    default: {type: Boolean, default: false}, 
    name: { type: String, unique: true, required: true },
    address: { type: String, required: false },
    inn: { type: String, required: false },
    createdDate: { type: Date, default: Date.now },
});

module.exports =mongoose.model('Company', schema);