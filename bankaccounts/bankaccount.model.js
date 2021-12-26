const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const correspondentBankSchema = new Schema({
    bankName: { type: String },
    swift: { type: String },
    address: { type: [String], default: []},
});

const schema = new Schema({
    accountName: { type: String, required: true },
    accountNumber: { type: String, unique: true, required: true },
    bankName: { type: String, required: true },
    swift: { type: String },
    bankAddress: { type: [String], default: [] },
    correspondentBank: correspondentBankSchema,
    currency: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BankAccount', schema);