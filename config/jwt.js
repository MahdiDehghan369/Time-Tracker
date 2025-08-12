const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    try {
        
        const accessToken = jwt.sign(
          { id },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );
        return accessToken

    } catch (error) {
        throw error
    }
}


const generateRefreshToken = (id) => {
  try {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "15d",
    });
    return refreshToken;
  } catch (error) {
    throw error;
  }
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
};



module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};