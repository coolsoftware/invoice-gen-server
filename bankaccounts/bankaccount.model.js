const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    accountName: { type: String, required: true },
    accountNumber: { type: String, unique: true, required: true },
    bankName: { type: String, required: true },
    currency: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BankAccount', schema);