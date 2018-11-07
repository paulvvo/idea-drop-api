const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'password',
    database : 'ideadropapi'
  }
});

var app = express();
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var database = [
	{
		name: "jack",
		age: 12,
		height:5,
		color:"blue"
	},
	{
		name: "paul",
		age: 54,
		height:8,
		color:"black"
	},
	{
		name: "terry",
		age: 89,
		height:5,
		color:"yelllow"
	},
	{
		name: "berry",
		age: 9,
		height:5,
		color:"pink"
	}
]
app.get("/", (req,res)=>{
	res.json("helloworld");
});

app.post("/login", (req,res)=>{
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


})

app.post("/register", (req,res) => {
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
})




app.listen(3001, function(){
		console.log("server is listening");
})
// Route Planning
// -Sign In Route POST
// -Register Route POST
// -Logout Route POST
// -New Idea Drop Route POST
// -Update Idea Drop Route PUT
// -Delete Idea Drop Route DELETE
