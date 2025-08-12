const authServie = require('./auth.service');

exports.login = async (req, res, next) => {
    try {
        const result = await authServie.loginUser(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
  try {
    const result = await authServie.registerUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


exports.getMe = async (req, res, next) => {
  try {
    const result = await authServie.getMe(req)
    return res.status(200).json(result);
  } catch (error) {
    next(error)
  }
}