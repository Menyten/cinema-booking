const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    title: String,
    productionCountries: [{ type: String }],
    productionYear: Number,
    length: Number,
    genre: String,
    distributor: String,
    language: String,
    subtitles: String,
    director: String,
    actors: [String],
    description: String,
    image: [String],
    youtubeTrailers: String,
    reviews: [{
        source: String,
        quote: String,
        stars: Number,
        max: Number
    }]
}, {
    toJSON: { virtuals: true }
});

movieSchema.virtual('showtimes', {
    ref: 'Showtime',
    localField: 'title',
    foreignField: 'film',
    justOne: false
});

module.exports = db.model('Movie', movieSchema);