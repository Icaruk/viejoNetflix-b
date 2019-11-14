
// Imports
const mongoose = require("mongoose");



const initDb = () => {
	
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
	
};


// Export
module.exports = initDb;