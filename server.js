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

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Controllers
const ideadrop = require("./controllers/ideadrop"),
			register = require('./controllers/register'),
			login 	 = require("./controllers/login");

//Login and Register Routes
app.post("/login", (req,res)=>{
	login.handleLogin(req,res,knex,bcrypt);
})
app.post("/register", (req,res) => {
	register.handleRegister(req,res,knex,bcrypt);
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
