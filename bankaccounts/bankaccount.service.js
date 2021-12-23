const config = require('config.json');
const db = require('_helpers/db');
const BankAccount = db.BankAccount;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll() {
    return await BankAccount.find();
}

async function getById(id) {
    return await BankAccount.findById(id);
}

async function create(param) {
    if (await BankAccount.findOne({ accountNumber: param.accountNumber })) {
        throw `Bank account "${param.accountNumber}" already exists`;
    }
    const account = new BankAccount(param);
    await account.save();
    return await BankAccount.findOne({ accountNumber: param.accountNumber });
}

async function update(id, param) {
    const account = await BankAccount.findById(id);

    if (!account) throw 'Bank account not found';
    if (account.accountNumber !== param.accountNumber && await BankAccount.findOne({ accountNumber: param.accountNumber })) {
         throw `Bank account "${param.accountNumber}" already exists`;
    }

    Object.assign(account, param);

    await account.save();
}

async function _delete(id) {
    await BankAccount.findByIdAndRemove(id);
}