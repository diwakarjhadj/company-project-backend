const axios = require('axios');
const InitializeDatabase = require('../model/seeds.js');
// export const newMessage = async (req, res) => {
//     try {
//         const newMessage = new Message(req.body);
//         await newMessage.save();
//         await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text });
//         return res.status(200).json("Message has been sent Successfully");
//     } catch (err) {
//         return res.status(500).json(err.message);
//     }
// }


const getInitialdata = async (req, res) => {
    try {
        // Fetch JSON data from third-party API
        console.log("My Controller")
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const jsonData = response.data;
        console.log("Response:-",jsonData);

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