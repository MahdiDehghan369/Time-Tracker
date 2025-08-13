const User = require('./../auth/auth.model');

exports.getAllUsers = async() => {
    const users = await User.find({} , "-__v -password").lean()

    return {
        success: true,
        users
    }
}