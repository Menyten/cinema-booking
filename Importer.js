/**
  * This program needs to be run once
  * to import our auditorium and movie data from JSON to MongoDB
  *
*/

const mongoose = require('mongoose');

// Connect to db
let connectionString =
	'mongodb://cinema:cinema123@cinema-shard-00-00-rlvpw.mongodb.net:27017,cinema-shard-00-01-rlvpw.mongodb.net:27017,cinema-shard-00-02-rlvpw.mongodb.net:27017/test?ssl=true&replicaSet=cinema-shard-0&authSource=admin&retryWrites=true';
module.exports = connectionString;
mongoose.connect(connectionString, { useNewUrlParser: true });
global.db = mongoose.connection;
db.on('error', () => reject('Could not connect to DB'));
db.once('open', () => importJsonDataToDb());

// Load the Mongoose model
let Auditorium = require('./schemas/Auditorium');
let Movie = require('./schemas/Movie');

// Load the json data from file
let auditoriumData = require('./auditorium.json');
let movieData = require('./movie.json');

async function importJsonDataToDb() {
	let allAuditoriumCount = await Auditorium.count();
	let allMovieCount = await Movie.count();
	// if the db already contains auditorium then delete them
	if (allAuditoriumCount > 0) {
		console.log('Deleted old auditoriums', await Auditorium.remove({}));
	}

	if (allMovieCount > 0) {
		console.log('Deleted old movies', await Movie.remove({}));
	}

	for (let data of auditoriumData) {
		let auditorium = new Auditorium(data);
		// save the auditorium to MongoDB
		await auditorium.save();
	}

	for (let data of movieData) {
		let movie = new Movie(data);
		// save the movie to MongoDB
		await movie.save();
	}

	// after the import count the auditoriums and movies again
	allAuditoriumCount = await Auditorium.count();
	allMovieCount = await Movie.count();
	// Exit the app
	process.exit();
}