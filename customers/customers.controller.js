const express = require('express');
const router = express.Router();
const customerService = require('./customer.service');
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
    customerService.getAll()
        .then(customers => res.json(customers))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    customerService.getById(params.id)
        .then(customer => res.json(customer))
        .catch(err => next(err));
}

function create(req, res, next) {
    const bodySchema = Joi.object({
        name: Joi.string(),
        inn: Joi.string(),
        address: Joi.string(),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    customerService.create(body)
        .then(customer => res.json(customer))
        .catch(err => next(err));
}

function update(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    const bodySchema = Joi.object({
        name: Joi.string(),
        inn: Joi.string(),
        address: Joi.string(),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    customerService.update(params.id, body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    customerService.delete(params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}