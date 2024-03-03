const express = require('express');
const getInitialdata = require('../controller/seeds-controller.js');
const transaction= require('../controller/transaction-controller.js')
// import { newConversation, getConversation } from '../controller/conversation-controller.js';
// import { newMessage,getMessages } from '../controller/message-controller.js';
// import { uploadFile, getImage } from '../controller/image-controller.js';
// import upload from '../utils/upload.js'
const route = express.Router();

route.use(express.json());

route.get('/initialize-database',getInitialdata);
route.get('/transactions',transaction);
// route.post('/conversation/add',newConversation);
// route.post('/conversation/get',getConversation);
// route.post('/message/add',newMessage);
// route.get('/message/get/:id',getMessages);
// route.post('/file/upload',upload.single("file"),uploadFile);
// route.get('/file/:filename',getImage);

module.exports = route;
