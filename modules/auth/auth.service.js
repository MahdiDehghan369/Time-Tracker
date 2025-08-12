const User = require("./auth.model");
const appError = require("../../utils/appError");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./../../config/jwt");

exports.loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    appError("Email or Password incorrect");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    appError("Email or Password incorrect");
  }

  const accessToken = generateAccessToken(user._id);

  return {
    success: true,
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

exports.registerUser = async (data) => {
    const {email , password , name} = data

    const emailExists = await User.findOne({email}).lean()

    if(emailExists){
        appError("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(password , 12)

    const user = await User.create({email , name , password: hashedPassword})

    return {
        success: true,
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }
}


exports.getMe = async (req) => {
  const user = req?.user

  return {
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  }
}