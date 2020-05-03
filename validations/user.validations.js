const Joi = require('@hapi/joi');

const loginUserSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.min(6)
		.max(128)
		.required()
});

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
