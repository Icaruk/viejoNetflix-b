
// Imports
const express = require("express");
const app = express();



// Init DB
require("./DB/db_init")();



// Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    next();
});
app.use(express.json()); // parsea objetos STRING a JSON 



// Routes
app.use(require("./routes/rt_user"));
app.use(require("./routes/rt_movies"));
app.use(require("./routes/rt_orders"));





/*
app.get("/user/:id", (req, res) => {
	
	UserModel.findById(req.params.id).then( (data) => {
		res.send(data)
	}).catch( (err) => {
		console.log( err );
	});
	
});

app.patch("/user/:id", (req, res) => {
	
	UserModel.findByIdAndUpdate(req.params.id, {
		... req.body
	}, {
		new: true,
		useFindAndModify: false
	}).then( (user) => {
		res.send(user);
	}).catch (err => console.log(err));
	
});

app.delete("/user/:id", (req, res) => {
	
	UserModel.findByIdAndDelete(req.params.id)
	.then( (user) => {
		res.send({message: "User deleted.", user});
	}).catch (err => console.log(err));
	
});

app.patch("/user/:id", (req, res) => {
	
	UserModel.findByIdAndUpdate(req.params.id, {
		... req.body
	}, {
		new: true,
		useFindAndModify: false
	}).then( (user) => {
		res.send(user);
	}).catch (err => console.log(err));
	
});
*/



// Init srv
app.listen(3000, ( () => {
	console.log( "    ---> Server listening on port 3000" );
}));

