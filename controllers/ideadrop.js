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
}

const handleUpdateDrop = (req,res,knex) => {
	//gets the id from the parameter and finds the object in database and updates it
}

const handleDeleteDrop = (req,res,knex) => {
		//gets the id of an object and deletes it
}

module.exports = {
	handleCreateDrop:handleCreateDrop,
	handleGetDrop,
	handleUpdateDrop,
	handleDeleteDrop,
}
