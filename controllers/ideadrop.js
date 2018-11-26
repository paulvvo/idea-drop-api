const handleCreateDrop = (req,res,knex) => {
	//insert into drops(name, picture, price, description, category, owner)
	//values(name, picture, price, description, category, owner)

	knex('drops')
	.insert(req.body)
	.returning("*")
	.then(createdDrop => res.json(createdDrop))
	.catch(err => res.status(400).json(err));

}

module.exports = {
	handleCreateDrop:handleCreateDrop
}
