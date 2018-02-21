const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const spectatorSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invali email address.'],
		required: 'Please supply an email address.'
	},
	name: {
		type: String,
		trim: true,
		required: 'Please supply a name.'
	}
})

spectatorSchema.virtual('gravatar', function() {
	const hash = md5(this.email)
	console.log(`https://gravatar.com/avatar/${hash}?s=200`)
	return `https://gravatar.com/avatar/${hash}?s=200`
})

// passport-local-mongoose exposes .register()
spectatorSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
spectatorSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Spectator', spectatorSchema)