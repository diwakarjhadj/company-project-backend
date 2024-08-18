const Transaction = require('../model/seeds.js');
const { getMonthQuery } = require('../../utils/monthUtils.js');
const piechart = async (req, res) => {
    try {
        const { month } = req.query;

        // Retrieve transactions for the selected month
        const monthQuery = getMonthQuery(month);
        const transactions = await Transaction.find({
            dateOfSale: monthQuery // Match any day in the selected month
        });

        // Extract unique categories from the transactions
        const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];

        // Count the number of items for each unique category
        const categoryCounts = {};
        uniqueCategories.forEach(category => {
            categoryCounts[category] = transactions.filter(transaction => transaction.category === category).length;
        });

        // Prepare the response data
        const responseData = {};
        uniqueCategories.forEach(category => {
            responseData[category] = categoryCounts[category];
        });

        // Send the response
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = piechart;
