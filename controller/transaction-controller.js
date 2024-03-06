const Transaction = require('../model/seeds.js');

const transaction = async (req, res) => {
    try {
        const { month, search, page = 1, perPage = 10 } = req.query;
    
        // Build query
        const query = {
            dateOfSale: {
                $gte: new Date('2021-01-01'), // Start of 2021
                $lte: new Date('2023-12-31')  // End of 2022
              }
        };

        // if (month) {
        //   const startDate = new Date(month + '-01');
        //   console.log("Start Date:-",startDate);
        //   const endDate = new Date(startDate);
        //   console.log("End Date:-",endDate);
        //   endDate.setMonth(startDate.getMonth() + 1);
        // //   query.dateOfSale = { $gte: startDate, $lt: endDate };
        // }

        if (month) {
          // Convert month string to its corresponding number
          const monthMap = {
              January: 1,
              February: 2,
              March: 3,
              April: 4,
              May: 5,
              June: 6,
              July: 7,
              August: 8,
              September: 9,
              October: 10,
              November: 11,
              December: 12
          };

          // Check if the month provided is valid
          if (monthMap.hasOwnProperty(month)) {
              const monthNumber = monthMap[month];
              const startDate = new Date(`2021-${monthNumber}-01`);
              const endDate = new Date(startDate);
              endDate.setMonth(startDate.getMonth() + 1);
              query.dateOfSale = { $gte: startDate, $lt: endDate };
          } else {
              return res.status(400).json({ error: 'Invalid month provided' });
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
