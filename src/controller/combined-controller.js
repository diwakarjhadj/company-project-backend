const axios = require('axios');
const combinedata= async(req,res)=>{
    try {
        // Define the URLs for the three APIs
        console.log("Hello")
        const pieChartUrl = `http://localhost:5000/pie-chart?month=${req.query.month}`;
        const barChartUrl = `http://localhost:5000/bar-chart?month=${req.query.month}`;
        const statisticsUrl = `http://localhost:5000/statistics?month=${req.query.month}`;

        // Make concurrent requests to the three APIs using Axios
        const [pieChartData, barChartData, statisticsData] = await Promise.all([
            axios.get(pieChartUrl),
            axios.get(barChartUrl),
            axios.get(statisticsUrl)
        ]);

        // Combine the responses into a single JSON object
        const combinedData = {
            pieChart: pieChartData.data,
            barChart: barChartData.data,
            statistics: statisticsData.data
        };

        // Send the combined JSON object as the response
        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports=combinedata;