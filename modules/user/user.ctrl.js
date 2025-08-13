const userService = require('./user.service');

exports.getAllUsers = async (req, res, next) => {
    try {

        const result = await userService.getAllUsers()

        return res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}