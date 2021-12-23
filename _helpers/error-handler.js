function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ status: 'error', message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }
    
    // default to 500 server error
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Internal Error' });
}

module.exports = errorHandler;