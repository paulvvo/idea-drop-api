var express = require("express");
var app = express();


app.get("/", (req,res)=>{
	res.send("hello world");
});

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
