const Transaction= require('../model/seeds.js')
const { getMonthQuery } = require('../../utils/monthUtils.js');

const transaction = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 100 } = req.query;

    // Build query
    const query = {
      dateOfSale: {
        $gte: new Date('2021-01-01'), // Start of 2021
        $lte: new Date('2023-12-31')  // End of 2022
      }
    };

    if (month) {
      try {
          query.dateOfSale = getMonthQuery(month);
      } catch (error) {
          return res.status(400).json({ error: error.message });
      }
  }

    if (search) {
      const numericSearch = parseFloat(search);
      if (!isNaN(numericSearch)) {
        // If the search term is numeric, search the price field
        query.price = numericSearch;
      } else {
        // Otherwise, search the title and description fields
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
    }



    // Execute query with pagination
    console.log(query);
    // const transactions=await Transaction.find(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    console.log(transactions);

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = transaction;
