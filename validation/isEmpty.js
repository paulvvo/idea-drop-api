const isEmpty = (input) =>{
	if(input === undefined) return true
	if(input === null) return true
	if(typeof input === 'object' && Object.keys(input).length<1) return true
	if(typeof input === 'string' && input.length < 1) return true
	return false;

}

module.exports = isEmpty;
