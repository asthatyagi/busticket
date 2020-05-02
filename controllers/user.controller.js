const User=require('../models/user.model');
const objectId = require('mongodb').ObjectID;



// add user details

exports.addUser=async(req,res,next)=>{
   try{
    const body={
        ...req.body
    };
    if (body) {
        console.log(body)
        var person = new User(body);
        //console.log(person)
        var result = await person.save();
        res.send(result);
        if (result) {
            return res.status(200).json({
                Body: 'USER_ADDED'
            });
        } else {
            return res.status(400).json({
                Body: 'USER_COULD_NOT_BE_ADDED'
            });
        }
    } else {
        return res.status(400).json({
            Body: 'PLEASE_ENTER_DETAILS'
        });
    }
   }
   catch(e){
    return res.status(500).json({
        Body: 'NETWORK_ERROR'
    });
   }
}