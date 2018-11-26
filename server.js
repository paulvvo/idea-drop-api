const express = require("express"),
 			cors = require("cors"),
 			bcrypt = require("bcrypt"),
 			bodyParser = require("body-parser"),
 			knex = require('knex')({
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

//Controllers
const ideadrop = require("./controllers/ideadrop"),
			register = require('./controllers/register');

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
	register.handleRegister(req,res,knex);
});

//Idea Drop Routes
app.get("/ideadrop/:id", (req,res) => {
	ideadrop.handleGetDrop(req,res,knex);
});
app.post("/ideadrop", (req,res)=>{
	ideadrop.handleCreateDrop(req,res,knex);
});
app.put("/ideadrop/:id", (req,res) => {
	ideadrop.handleUpdateDrop(req,res,knex);
});
app.delete("./ideadrop/:id", (req,res) => {
	ideadrop.handleDeleteDrop(req,res,knex);
});


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
