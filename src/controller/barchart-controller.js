const Transaction = require('../model/seeds.js');
const { getMonthQuery } = require('../../utils/monthUtils.js');
const { generatePriceRanges } = require('../../utils/priceRangeUtils.js');


const barchart = async (req, res) => {
    try {
        const { month } = req.query;

        // Validate and parse the month
        const monthQuery = getMonthQuery(month);

        // Query transactions for the selected month
        const transactions = await Transaction.find({
            dateOfSale: monthQuery
        });

        const priceRanges = generatePriceRanges();

        // Initialize counts for each range
        const rangeCounts = {};
        priceRanges.forEach(range => {
            rangeCounts[range.range] = 0;
        });
        // Calculate counts for each price range
        transactions.forEach(transaction => {
            console.log(transaction);
            const price = transaction.price;
            for (const range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    rangeCounts[range.range]++;
                    break;
                }
            }
        });

        // Prepare response data
        const responseData = [];
        priceRanges.forEach(range => {
            responseData.push({
                range: range.range,
                count: rangeCounts[range.range]
            });
        });

        // Send response
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = barchart;