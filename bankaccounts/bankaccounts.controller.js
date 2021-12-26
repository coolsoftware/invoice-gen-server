const express = require('express');
const router = express.Router();
const bankAccountService = require('./bankaccount.service');
const Validate = require('_helpers/validate');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)

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
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    bankAccountService.getById(params.id)
        .then(account => res.json(account))
        .catch(err => next(err));
}

function create(req, res, next) {
    const bodySchema = Joi.object({
        accountName: Joi.string(),
        accountNumber: Joi.string(),
        bankName: Joi.string(),
        currency: Joi.string().valid('USD','CZK','RUB'),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    bankAccountService.create(body)
        .then(account => res.json(account))
        .catch(err => next(err));
}

function update(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    const bodySchema = Joi.object({
        accountName: Joi.string(),
        accountNumber: Joi.string(),
        bankName: Joi.string(),
        currency: Joi.string().valid('USD','CZK','RUB'),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    bankAccountService.update(params.id, body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramsError, value: params} = Validate.validateParams(paramSchema, req, res);
    bankAccountService.delete(params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}