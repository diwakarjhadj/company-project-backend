// monthUtils.js
const getMonthQuery = (month) => {
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

    if (monthMap.hasOwnProperty(month)) {
        const monthNumber = monthMap[month];
        const startDate = new Date(`2021-${monthNumber}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        return { $gte: startDate, $lt: endDate };
    } else {
        throw new Error('Invalid month provided');
    }
};

module.exports = { getMonthQuery };
