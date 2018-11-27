const isEmpty = require("./isEmpty");

const validateDropInput = (input) =>{
	const errors = {};
	if(isEmpty(input.name)) errors.dropName = "Drop's Name Field is Required";
	if(isEmpty(input.description)) errors.dropDesc = "Drop's Description Field is Required";
	if(isEmpty(input.category)) errors.dropCategory = "Drop's Category Field is Required";
	if(isEmpty(input.owner)) errors.dropOwner = "Drop's Owner Field is Required";
	if(isEmpty(input.price)) errors.dropPrice = "Drop's Price Field is Required";

	return {
		isValid:isEmpty(errors),
		errors:errors
	}
}

module.exports = validateDropInput;
