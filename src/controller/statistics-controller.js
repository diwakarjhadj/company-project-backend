const ProductTransaction = require('../model/seeds.js');

const statistics = async (req, res) => {
    try {
        const { month } = req.query;

        // Calculate start and end dates of the selected month
        const startDate = new Date('2021-' + month + '-01');
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        // Query for total sale amount of selected month
        const totalSaleAmount = await ProductTransaction.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$price" }
                }
            }
        ]);

        // Query for total number of sold items of selected month
        const totalSoldItems = await ProductTransaction.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate }
        });
        // Query for total number of not sold items of selected month
        const totalNotSoldItems = await ProductTransaction.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate },
            price: { $exists: true, $ne: null } // Assuming unsold items have null price
        });

        res.json({
            totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
};

module.exports = statistics;