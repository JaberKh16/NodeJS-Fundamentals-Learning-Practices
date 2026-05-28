const handleCentralError = (req, res, next) => {
    try {
        next();
    } catch(error) {
        console.error(JSON.stringify(error));
        console.log(error.constructor.name); // returns if any validation that error class name
        return res.status(500).json({ msg: 'Something went wrong.'});
    }
};

module.exports = handleCentralError;