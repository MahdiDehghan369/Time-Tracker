const User = require('./../modules/auth/auth.model');
const appError = require('./../utils/appError');
const {verifyAccessToken} = require('./../config/jwt');

const authMiddleware = async (req, res, next) => {
  const existsAuthorization = req?.headers?.authorization;

  if (!existsAuthorization || !existsAuthorization.startsWith("Bearer ")) {
    return res.status(400).json({
      success: false,
      message: "Access token missed or malformed",
    });
  }

  const token = existsAuthorization.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findOne({_id:decoded.id} , "-__v -password")

    if (!user) {
      throw new AppError("User Not Found", 404);
    }

    req.user = user
    next();
  } catch (error) {
    appError("Token invalid or expired", 422);
  }
};


module.exports = authMiddleware