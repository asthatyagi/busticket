const User=require('../models/user.model');
const Admin=require('../models/user.model');
const objectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtExpirationInterval, jwtSecretAdmin } = require('../config/vars');
const validate=require('../validations/user.validations');
const _ = require('lodash');

//admin login

exports.login = async (req, res) => {
	try {
		let { email, password } = req.body;

		const validationErrors = await validate.login(req.body);
		if (!_.isEmpty(validationErrors))
			return res.status(400).send(validationErrors);

        let admin = await Admin.findOne({ email });
        console.log(admin)

		if (!admin) {
			return res.status(400).json({
				Body: 'ADMIN_NOT_FOUND'
			});
		} else {
			// Check password
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log(admin.password,password)
			if (isMatch) {
				const payload = { _id: admin._id };
				// Sign token
				jwt.sign(
					payload,
					jwtSecretAdmin,
					{
						expiresIn: jwtExpirationInterval
					},
					async (err, token) => {
						await Admin.findOneAndUpdate(
							{ email },
							{
								token
							}
						);
						return res.status(200).json({
							Body: 'Bearer ' + token
						});
					}
				);
			} else {
				return res.status(400).json({
					Body: 'INCORRECT_PASSWORD'
				});
			}
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			Body: 'NETWORK_ERROR'
		});
	}
};


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
       console.log(e)
    return res.status(500).json({
        
        Body: 'NETWORK_ERROR'
    });
   }
}