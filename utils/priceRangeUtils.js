// utils/priceRangeUtils.js

const generatePriceRanges = () => {
    const ranges = [];
    let min = 0;
    let max = 100;
    const labels = ["0 - 100", "101 - 200", "201 - 300", "301 - 400", "401 - 500", "501 - 600", "601 - 700", "701 - 800", "801 - 900", "901 - above"];
    labels.forEach(label => {
        ranges.push({ range: label, min: min, max: max });
        min = max + 1;
        max += 100;
    });
    ranges[ranges.length - 1].max = Infinity; // Update the last range to include Infinity
    return ranges;
};

module.exports = { generatePriceRanges };
