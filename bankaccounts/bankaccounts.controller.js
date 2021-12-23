const express = require('express');
const router = express.Router();
const bankAccountService = require('./bankaccount.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    bankAccountService.getAll()
        .then(accounts => res.json(accounts))
        .catch(err => next(err));
}

function getById(req, res, next) {
    bankAccountService.getById(req.params.id)
        .then(account => res.json(account))
        .catch(err => next(err));
}

function create(req, res, next) {
    bankAccountService.create(req.body)
        .then(account => res.json(account))
        .catch(err => next(err));
}

function update(req, res, next) {
    bankAccountService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    bankAccountService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}