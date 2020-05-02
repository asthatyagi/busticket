const express = require('express');
const controller=require('../controllers/ticket.controller');
const router = express.Router();


router.route('/ticket').post(controller.addTicket);
router.route('/openClose').get(controller.listTicket);
router.route('/ticketStatus').get(controller.oneTicket);
router.route('/person-ticket').get(controller.personInfo);
router.route('/update-status').patch(controller.ticketStatus);
router.route('/open-ticket').get(controller.openAll);



module.exports=router;