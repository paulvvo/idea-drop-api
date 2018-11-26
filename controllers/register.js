const handleRegister = (req,res,knex,bcrypt) => {
	const saltRounds = 10;
	const {email,password} = req.body;

	if(email && password){
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if(err){
				res.status(400).json("There was a registration error");
			}
			const newUser = {
				email,
				hash,
			}
			knex('logins')
			.insert(newUser)
			.returning('*')
			.then(returningData => res.status(200).json(returningData[0]))
			.catch(err => res.status(400).json(err));
		});
	}
}

module.exports = {
	handleRegister:handleRegister,
}
