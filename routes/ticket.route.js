const express = require('express');
const controller=require('../controllers/ticket.controller');
const router = express.Router();


router.route('/ticket').post(controller.addTicket);
router.route('/openClose').get(controller.listTicket);
router.route('/ticketStatus').get(controller.oneTicket);



module.exports=router;