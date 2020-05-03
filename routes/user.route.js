const express = require('express');
const controller=require('../controllers/user.controller');
const router = express.Router();


router.route("/user").post(controller.addUser);
router.route("/admin").post(controller.login);

module.exports=router;