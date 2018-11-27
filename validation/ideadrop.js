const isEmpty = require(./isEmpty);

const validateDropInput = (input) =>{
	const errors = {};

	return {
		isValid:isEmpty(errors),
		errors:errors
	}
}

module.exports = validateDropInput;
