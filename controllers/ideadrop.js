const handleCreateDrop = (req,res,knex) => {
	//insert into drops(name, picture, price, description, category, owner)
	//values(name, picture, price, description, category, owner)

	knex('drops')
	.insert(req.body)
	.returning("*")
	.then(createdDrop => res.json(createdDrop))
	.catch(err => res.status(400).json(err));
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
