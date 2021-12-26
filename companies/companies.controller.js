const express = require('express');
const router = express.Router();
const companyService = require('./company.service');
const Validate = require('_helpers/validate');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)

// routes
router.get('/', getAll);
router.get('/default', getDefault);
router.get('/:id', getById);
router.post('/create', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    companyService.getAll()
        .then(companies => res.json(companies))
        .catch(err => next(err));
}

function getDefault(req, res, next) {
    companyService.getDefault()
        .then(company => res.json(company))
        .catch(err => next(err));
}

function getById(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    companyService.getById(params.id)
        .then(company => res.json(company))
        .catch(err => next(err));
}

function create(req, res, next) {
    const bodySchema = Joi.object({
        name: Joi.string(),
        inn: Joi.string(),
        vat: Joi.string(),
        address: Joi.array().items(Joi.string()),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    companyService.create(body)
        .then(company => res.json(company))
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
        vat: Joi.string(),
        address: Joi.array().items(Joi.string()),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    companyService.update(params.id, body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    companyService.delete(params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}