const handleCreateDrop = (req,res,knex) => {
	//insert into drops(name, picture, price, description, category, owner)
	//values(name, picture, price, description, category, owner)
	const {owner, name, category, picture, price, description} = req.body;

	// knex('drops')
	// .insert({
	// 	name,
	// 	owner,
	// 	category,
	// 	picture,
	// 	price
	// })
	// .returning("*")
	// .then(createdDrop => res.json(createdDrop))
	// .catch(err => res.status(400).json(err));

	knex.transaction(trx => {
		trx('drops')
		.insert({
			name,
			picture,
			category,
			owner,
			price
		})
		.returning("*")
		.then(createdDrop =>{
			return trx('dropsdesc')
			.insert({
				name:createdDrop[0].name,
				email:createdDrop[0].owner,
				description,
			})
			.returning("*")
			.then(createdDropDesc => {
				// console.log(createdDropDesc[0]);
				// console.log(createdDrop[0]);
				res.json(createdDropDesc[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Idea Drop was not created"));

}

const handleGetDrop = (req,res,knex) => {
	//returns the object with the same id as the the one provided
	res.json("Get Drop");
}

const handleUpdateDrop = (req,res,knex) => {
	//gets the id from the parameter and finds the object in database and updates it
	res.json("Update Drop");
}

const handleDeleteDrop = (req,res,knex) => {
	//gets the id of an object and deletes it
	res.json("Delete Drop");
}

module.exports = {
	handleCreateDrop:handleCreateDrop,
	handleGetDrop,
	handleUpdateDrop,
	handleDeleteDrop,
}
