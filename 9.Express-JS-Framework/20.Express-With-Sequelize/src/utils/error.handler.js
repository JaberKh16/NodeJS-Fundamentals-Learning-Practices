const responseErrorHandler = (error, req, res, next) => {
  console.error(JSON.stringify(error));
  console.log(error.constructor.name); // returns if any validation that error class name
  if(error instanceof UniqueConstraintError){
    return res.status(409).json({
      error: 'Validation Error',
      details: {
        field: error.errors[0].path,
        message: error.errors[0].message
      }
    })
  }
  if(error instanceof ValidationError) {
    return res.status(422).json({ error: 'Validation Error', details: error.errors.map(e => {
      field: e.path, message: e.message
    }));
  }
  return res.status(500).json({ msg: 'Something went wrong.'});
}

module.exports = responseErrorHandler;
