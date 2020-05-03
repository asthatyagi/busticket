module.exports = {
	//env: config.NODE_ENV,
	port: 3000,
	jwtSecret: "avGrCI6MTU3MDb3NjA1UCwifT4RexTcwNzc2OFT4Er",
	jwtSecretAdmin: "Dc3NjY1OCwiZXhwIjoxNTcwODA4MjE0fQ",
	jwtExpirationInterval: "31556926",
	mongo: {
		uri:
        'mongodb://localhost:27017/bus-ticket'
	}

};