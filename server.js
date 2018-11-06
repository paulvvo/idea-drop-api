var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

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
	res.send("hello world");
});

app.post("/login", (req,res)=>{
	if(req.body.name === database[0].name){
		res.status(200).json(database[0]);
	}else{
		console.log('error');
	}
})

app.post("/register", (req,res) => {
	if(req.body.username && req.body.password){
		const newUser = {
			user: req.body.username,
			password: req.body.password
		}
		database.push(newUser);
		res.json("Added New User");
	}else{
		res.status(400).json("error creating new user, try again");
	}
})
app.listen(3001, function(){
		console.log("listening");
})


// Route Planning
// -Sign In Route POST
// -Register Route POST
// -Logout Route POST
// -New Idea Drop Route POST
// -Update Idea Drop Route PUT
// -Delete Idea Drop Route DELETE
