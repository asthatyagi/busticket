const jwt = require('jsonwebtoken');
const { jwtExpirationInterval, jwtSecret, jwtSecretAdmin } = require('../config/vars');
const { User, Admin } = require('../models/user.model');

const admin = async (req, res, next) => {
    try {
        console.log('token ---- ' + req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecretAdmin);
        console.log('decoded ---- ', decoded);

        const admin = await Admin.findById(decoded._id);
        if (!admin) return res.status(200).json({ Body: 'INVALID_ADMIN' });
        console.log(admin);
        if (admin.token === token) {
            req.token = token;
            req.admin = admin;
            next();
        } else return res.status(400).json({ Body: 'YOU_NEED_TO_LOGIN_FIRST' });
    } catch (e) {
        console.log(e);
        res.status(401).json({ Body: 'UNABLE_TO_AUTHENTICATE' });
    }
};

const authUser = async (req, res, next) => {
    try {
        console.log('token ---- ' + req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, jwtSecret);

        const user = await User.findById(decoded._id);
        if (!user) return res.status(200).json({ Body: 'USER_NOT_FOUND' });

        if (user.token === token) {
            req.token = token;
            req.user = user;
            next();
        } else return res.status(400).json({ Body: 'YOU_NEED_TO_LOGIN_FIRST' });
    } catch (e) {
        console.log(e);
        res.status(401).json({ Body: 'UNABLE_TO_AUTHENTICATE' });
    }
};

module.exports = { authUser, admin };
