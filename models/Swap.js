const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')

const swapSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter your swap meet name.',
	},
	slug: String,
	description: {
		type: String,
		trim: true,
		required: 'Please enter a description of your swap meet.',
	},
	cost: Number,
	uri: String,
	socialMediaLinks: [String],
	image: String,
	tags: [String],
	date: [Date],
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [{
			type: Number,
			required: 'You must supply coordinates.'
		}]
	}
})

swapSchema.statics.getTagsList = function() {
	return this.aggregate([
		{ $unwind: '$tags' },
		{ $group: { _id: '$tags', count: { $sum: 1 }}},
		{ $sort: { count: -1 }}
	])
}

swapSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'swap'
})

module.exports = mongoose.model('Swap', swapSchema)