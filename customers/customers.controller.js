const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    customerService.getAll()
        .then(customers => res.json(customers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    customerService.getById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => next(err));
}

function create(req, res, next) {
    customerService.create(req.body)
        .then(customer => res.json(customer))
        .catch(err => next(err));
}

function update(req, res, next) {
    customerService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    customerService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}