const handleLogin = (req,res,knex,bcrypt) => {
	const {email, password}  = req.body;
	knex('logins')
	.where({email:email})
	.returning('*')
	.then(returningUser =>{
		if(returningUser.length>0 && returningUser[0]){
			bcrypt.compare(password, returningUser[0].hash, function(err, results) {
				if(err)
					res.status(400).json("Error with Login");

				if(results){
					console.log(results);
					res.status(200).json("Succ");
				}else{
					res.status(400).json("Fail, Check Password");
				}

			});
		}else{
			res.status(400).json("Fail, Check Email");
		}
	})
	.catch(err => res.status(400).json(err));
}

module.exports = {
	handleLogin:handleLogin
}
