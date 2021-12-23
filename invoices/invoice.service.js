const config = require('config.json');
const db = require('_helpers/db');
const Invoice = db.Invoice;

const companyService = require('companies/company.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    new: _new,
};

async function getAll() {
    return await Invoice.find().populate(['sender','recipient','bankAccount']);
}

async function getById(id) {
    return await Invoice.findById(id).populate(['sender','recipient','bankAccount']);
}

async function create(param) {
    if (await Invoice.findOne({ number: param.number })) {
        throw `Invoice number "${param.number}" already exists`;
    }
    const invoice = new Invoice(param);
    await invoice.save();
    return await Invoice.findOne({ number: param.number });
}

async function update(id, param) {
    const invoice = await Invoice.findById(id);

    if (!invoice) throw 'Invoice not found';

    Object.assign(invoice, param);

    await invoice.save();
}

async function _delete(id) {
    await Invoice.findByIdAndRemove(id);
}

async function _new() {    
    const sender = await companyService.getDefault();
    return {
        number: Date.now().toString(),
        date: (new Date()),
        sender,
        items: [],
    }
}
