const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')

const vendorSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter your vendor name.',
	},
	slug: String,
	description: {
		type: String,
		trim: true,
		required: 'Please enter a description of your goods.',
	},
	uri: String,
	socialMediaLinks: [String],
	image: String,
	tags: [String]
})

vendorSchema.pre('save', async function(next) {
	if (!this.isModified('name')) return next()

	this.slug = slug(this.name)

	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)`, 'i')
	const vendorsWithSlug = await this.constructor.find({ slug: slugRegEx })
	if (vendorsWithSlug.length) {
		this.slug = `${this.slug}-${vendorsWithSlug.length + 1}`
	}
	next()
})

module.exports = mongoose.model('Vendor', vendorSchema)