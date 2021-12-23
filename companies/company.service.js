const config = require('config.json');
const db = require('_helpers/db');
const Company = db.Company;

module.exports = {
    getAll,
    getById,
    getDefault,
    create,
    createDefault,
    update,
    delete: _delete,
};

async function getAll() {
    return await Company.find();
}

async function getById(id) {
    return await Company.findById(id);
}

async function getDefault() {
    return await Company.findOne({default:true});
}

async function create(param) {
    if (await Company.findOne({ name: param.name })) {
        throw `Company "${param.name}" already exists`;
    }
    const company = new Company(param);
    await company.save();
    return await Company.findOne({ name: param.name });
}

async function createDefault() {
    const company = await Company.findOne({default:true});
    if (company) {
        console.log('default company already exists');
        return company;
    }
    return await create({
        default: true,
        name: 'Your Company',
    });
}

async function update(id, param) {
    const company = await Company.findById(id);

    if (!company) throw 'Company not found';
    if (company.name !== param.name && await Company.findOne({ name: param.name })) {
         throw `Company "${param.name}" already exists`;
    }

    Object.assign(company, param);

    await company.save();
}

async function _delete(id) {
    await Company.findByIdAndRemove(id);
}