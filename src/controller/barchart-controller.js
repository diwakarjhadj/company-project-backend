const Transaction = require('../model/seeds.js');
const { getMonthQuery } = require('../../utils/monthUtils.js');

const barchart = async (req, res) => {
    console.log("hi");
    try {
        const { month } = req.query;

        // Validate and parse the month
        const monthQuery = getMonthQuery(month);

        // Query transactions for the selected month
        const transactions = await Transaction.find({
            dateOfSale: monthQuery
        });

        console.log("Traansactions:-",transactions);
        // Define price ranges
        const priceRanges = [
            { range: '0 - 100', min: 0, max: 100 },
            { range: '101 - 200', min: 101, max: 200 },
            { range: '201 - 300', min: 201, max: 300 },
            { range: '301 - 400', min: 301, max: 400 },
            { range: '401 - 500', min: 401, max: 500 },
            { range: '501 - 600', min: 501, max: 600 },
            { range: '601 - 700', min: 601, max: 700 },
            { range: '701 - 800', min: 701, max: 800 },
            { range: '801 - 900', min: 801, max: 900 },
            { range: '901 - above', min: 901, max: Infinity }
        ];

        // Initialize counts for each range
        const rangeCounts = {};
        priceRanges.forEach(range => {
            rangeCounts[range.range] = 0;
        });

        // Calculate counts for each price range
        transactions.forEach(transaction => {
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