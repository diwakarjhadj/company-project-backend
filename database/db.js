const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

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