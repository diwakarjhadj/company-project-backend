const axios = require('axios');
const InitializeDatabase = require('../model/seeds.js');

const getInitialdata = async (req, res) => {
    try {
        // Fetch JSON data from third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const jsonData = response.data;

        // Clear existing data in the database
        // console.log("Response",response);
        await InitializeDatabase.deleteMany({});

        // // Insert seed data into the database
        await InitializeDatabase.insertMany(jsonData);

        res.json({ message: 'Database initialized successfully' });
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).json({ error: 'Database initialization failed' });
    }
};

module.exports = getInitialdata;