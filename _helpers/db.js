const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString);

module.exports = {
    Company: require('companies/company.model'),
    Customer: require('customers/customer.model'),
    BankAccount: require('bankaccounts/bankaccount.model'),
    Invoice: require('invoices/invoice.model'),
};