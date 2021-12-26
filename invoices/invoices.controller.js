const express = require('express');
const router = express.Router();
const invoiceService = require('./invoice.service');
const Validate = require('_helpers/validate');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)

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
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    invoiceService.getById(params.id)
        .then(invoice => res.json(invoice))
        .catch(err => next(err));
}

function create(req, res, next) {
    const bodySchema = Joi.object({
        number: Joi.string(),
        date: Joi.date().iso(),
        items: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            qty: Joi.number().min(0).required(),
            rate: Joi.number().min(0).required(),
        })),
        total: Joi.number(),
        sender: {
            _id: Joi.objectId()
        },
        recipient: {
            _id: Joi.objectId()
        },
        bankAccount: {
            _id: Joi.objectId()
        }
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    invoiceService.create(body)
        .then((invoice) => res.json(invoice))
        .catch(err => next(err));
}

function update(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    const bodySchema = Joi.object({
        number: Joi.string(),
        date: Joi.date().iso(),
        items: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            qty: Joi.number().min(0).required(),
            rate: Joi.number().min(0).required(),
        })),
        total: Joi.number(),
        sender: {
            _id: Joi.objectId()
        },
        recipient: {
            _id: Joi.objectId()
        },
        bankAccount: {
            _id: Joi.objectId()
        },
        paid: Joi.boolean(),
    });
    const {error: bodyError, value: body} = Validate.validateBody(bodySchema, req, res);
    if (bodyError) return next();
    invoiceService.update(params.id, body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const paramSchema = Joi.object({
        id: Joi.objectId()
    });
    const {error: paramError, value: params} = Validate.validateParams(paramSchema, req, res);
    if (paramError) return next();
    invoiceService.delete(params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _new(req, res, next) {
    invoiceService.new()
        .then(invoice => res.json(invoice))
        .catch(err => next(err));
}
