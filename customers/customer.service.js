const config = require('config.json');
const db = require('_helpers/db');
const Customer = db.Customer;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await Customer.find();
}

async function getById(id) {
    return await Customer.findById(id);
}

async function create(param) {
    if (await Customer.findOne({ name: param.name })) {
        throw `Customer "${param.name}" already exists`;
    }
    const customer = new Customer(param);
    await customer.save();
    return await Customer.findOne({ name: param.name });
}

async function update(id, param) {
    const customer = await Customer.findById(id);

    if (!customer) throw 'Customer not found';
    if (customer.name !== param.name && await Customer.findOne({ name: param.name })) {
         throw `Customer "${param.name}" already exists`;
    }

    Object.assign(customer, param);

    await customer.save();
}

async function _delete(id) {
    await Customer.findByIdAndRemove(id);
}