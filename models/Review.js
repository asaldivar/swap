const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const reviewSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now()
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'Spectator',
		required: 'You must provide an author for your review.'
	},
	swap: {
		type: mongoose.Schema.ObjectId,
		ref: 'Swap',
		required: 'You must provide a swap meet.'
	},
	text: {
		type: String,
		required: 'You must provide a description of your view.'
	},
	rating: {
		type: Number,
		min: 1,
		max: 5
	}
})

module.exports = mongoose.model('Review', reviewSchema)