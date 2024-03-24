const express = require('express');
const getInitialdata = require('../controller/seeds-controller.js');
const transactionController = require('../controller/transaction-controller.js');
const statisticsController = require('../controller/statistics-controller.js');
const barchartController = require('../controller/barchart-controller.js');
const piechartController = require('../controller/piechart-controller.js');
const combinedController=require('../controller/combined-controller.js');
const route = express.Router();

route.use(express.json());

route.get('/initialize-database', getInitialdata);
route.get('/transactions', transactionController);
route.get('/statistics', statisticsController);
route.get('/bar-chart', barchartController);
route.get('/pie-chart',piechartController);
route.get('/combined-data',combinedController);
// route.get('/message/get/:id',getMessages);
// route.post('/file/upload',upload.single("file"),uploadFile);
// route.get('/file/:filename',getImage);

module.exports = route;
