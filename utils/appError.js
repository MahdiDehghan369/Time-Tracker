const appError = (message, code) => {
  const err = new Error(message);
  err.statusCode = code;
  throw err;
};


module.exports = appError