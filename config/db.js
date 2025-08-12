const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database successfully :)");
    } catch (error) {
        console.log("Connect to database faild :(");
        process.exit(1)
    }
}


module.exports = connectToDB