const { isValidObjectId } = require("mongoose")
const appError = require('./appError');

const validateObjectId = (id , type) => {
    if(!isValidObjectId(id)){
        return appError(`${type} ID is not valid :)`)
    }
}

module.exports = validateObjectId