require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('_helpers/error-handler');

const companyService = require('companies/company.service');

companyService.createDefault();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(mongoSanitize());

// api routes
app.use('/companies', require('companies/companies.controller'));
app.use('/customers', require('customers/customers.controller'));
app.use('/bankaccounts', require('bankaccounts/bankaccounts.controller'));
app.use('/invoices', require('invoices/invoices.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

