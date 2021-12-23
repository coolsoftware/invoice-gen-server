const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true},
    qty: { type: Number, required: true},
    rate: { type: Number, required: true},
});

const schema = new Schema({
    number: { type: String, unique: true, required: true },
    date: { type: Date, required: true },
    items: [ itemSchema ],
    total: { type: Number, required: true },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    recipient: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    bankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    },
    paid: { type: Boolean },
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', schema);