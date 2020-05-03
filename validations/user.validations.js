const Joi = require('@hapi/joi');
// const User = require("../models/user.model");

const signupUserSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.min(6)
		.max(128)
		.required(),
	confirmPassword: Joi.string()
		.valid(Joi.ref('password'))
		.required(),
	username: Joi.string()
		.min(1)
		.max(30)
		.required(),
	dob: Joi.date().required(),
	gender: Joi.string()
		.valid('man', 'woman')
		.required()
});

const updateProfileSchema = Joi.object({
	userId: Joi.string().required(),
	email: Joi.string().email(),
	password: Joi.string()
		.min(6)
		.max(128),
	username: Joi.string()
		.min(1)
		.max(30),
	dob: Joi.date(),
	gender: Joi.string().valid('man', 'woman')
});

const updateUserProfileSchema = Joi.object({
	email: Joi.string().email(),
	password: Joi.string()
		.min(6)
		.max(128),
	username: Joi.string()
		.min(1)
		.max(30),
	dob: Joi.date(),
	gender: Joi.string().valid('man', 'woman')
});

const loginUserSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.min(6)
		.max(128)
		.required()
});

exports.signup = body => {
	return new Promise(resolve => {
		const { error, value } = signupUserSchema.validate(body);
		let validationErrors = {};
		if (error) {
			error.details.forEach(elem => {
				if (elem.context.key === 'username') {
					validationErrors['username'] =
						'"사용자" 이름 길이는 6 자 이상이어야합니다';
				} else {
					validationErrors[elem.context.key] = elem.message;
				}
			});
		}
		resolve(validationErrors);
	});
};

exports.login = body => {
	return new Promise(resolve => {
		const { error, value } = loginUserSchema.validate(body);
		let validationErrors = {};
		if (error) {
			error.details.forEach(elem => {
				validationErrors[elem.context.key] = elem.message;
			});
		}
		resolve(validationErrors);
	});
};

exports.updateUserProfile = body => {
	return new Promise(resolve => {
		const { error, value } = updateUserProfileSchema.validate(body);
		let validationErrors = {};
		if (error) {
			error.details.forEach(elem => {
				validationErrors[elem.context.key] = elem.message;
			});
		}
		resolve(validationErrors);
	});
};

exports.updateProfile = body => {
	return new Promise(resolve => {
		const { error, value } = updateProfileSchema.validate(body);
		let validationErrors = {};
		if (error) {
			error.details.forEach(elem => {
				validationErrors[elem.context.key] = elem.message;
			});
		}
		resolve(validationErrors);
	});
};
