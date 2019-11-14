
// Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const UserModel = require("./models/User");
const { registerUser, getAllUsers }  = require("./DB/db_user");
const { addMovie, getAllMovies } = require("./DB/db_movie");


// DB
// mongoose.connect("mongodb://localhost:27017/DB_angularPelis", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// }).then ( () => {
// 	console.log( "    ---> Connected to mongoDB" );
// }).catch ( (err) => {
// 	console.log( err );
// });



// Mio
const uri = "mongodb+srv://Server_viejoNetflix:1234@cluster0-j9rpr.mongodb.net/viejoNetflix?retryWrites=true&w=majority";
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true	
}).then( () => {
	console.log( "    ---> Connected to mongoDB" );
}).catch( (err) => {
	console.log( err );
});



// Middlewares
app.use(express.json()); // parsea objetos STRING a JSON 



// Routes
app.get("/user/all", getAllUsers);
app.post("/user/register", registerUser);

app.get("/movie/all", getAllMovies);
app.post("/movie/add", addMovie);



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



// Init srv
app.listen(3000, ( () => {
	console.log( "    ---> Server listening on port 3000" );
}));

