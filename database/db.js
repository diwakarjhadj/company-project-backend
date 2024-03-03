const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// const USERNAME=process.env.DB_USERNAME;
// const PASSWORD=process.env.DB_PASSWORD;
const Connection = async () => {
    const URL = process.env.URL;
    try {
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log('Error', err.message);
    }
}

module.exports = Connection;