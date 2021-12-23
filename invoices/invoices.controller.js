const express = require('express');
const router = express.Router();
const invoiceService = require('./invoice.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/new', _new);

module.exports = router;

function getAll(req, res, next) {
    invoiceService.getAll()
        .then(invoices => res.json(invoices))
        .catch(err => next(err));
}

function getById(req, res, next) {
    invoiceService.getById(req.params.id)
        .then(invoice => res.json(invoice))
        .catch(err => next(err));
}

function create(req, res, next) {
    invoiceService.create(req.body)
        .then((invoice) => res.json(invoice))
        .catch(err => next(err));
}

function update(req, res, next) {
    invoiceService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    invoiceService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _new(req, res, next) {
    invoiceService.new()
        .then(invoice => res.json(invoice))
        .catch(err => next(err));
}
