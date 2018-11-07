const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

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
	res.send("hello world");
});

app.post("/login", (req,res)=>{
	if(req.body.email === database[database.length -1].email){
		bcrypt.compare(req.body.password, database[database.length -1].hash, function(err, results) {
			if(err){
				res.status(400).json("Error with Login");

			}else{
				res.status(200).json("Succ");
			}
		});

	}else{
		console.log('error');
	}


	//
	// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
	// 		// res == false
	// 		console.log(res);
	// });
})

app.post("/register", (req,res) => {
	if(req.body.email && req.body.password){

		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		  // Store hash in your password DB.
			if(err){
				res.status(400).json("There was a registration error");
			}
			console.log(hash);
			const newUser = {
				email:req.body.email,
				hash: hash,
			}
			database.push(newUser);
			res.status(200).json(newUser)

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
