const Joi = require('joi');

function validateData(schema, data, res) {
    const {error , value} = schema.validate(data);
    if (error) {
        const message = 'Invalid ' + 
            ((error.details && error.details.length && 
            error.details[0].context && error.details[0].context.key) || 
            'request data');
        console.warn('validate:', message);
        res.status(422).json({
            status: 'error',
            message
        });
    }
    return {error, value};    
}

function validateBody(schema, req, res) {
    return validateData(schema, req.body, res);
}

function validateQuery(schema, req, res) {
    return validateData(schema, req.query, res);
}

function validateParams(schema, req, res) {
    return validateData(schema, req.params, res);
}

module.exports = {
    validateData,
    validateBody,
    validateQuery,
    validateParams,
}