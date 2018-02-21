const mongoose = require('mongoose')
const Spectator = mongoose.model('Spectator')
const { promisify } = require('es6-promisify')

exports.getSpectators = (req, res) => {

}

exports.getSpectator = (req, res) => {
	
}

exports.validateRegister = (req, res, next) => {
	// santizing helps prevent XSS
	req.sanitizeBody('name')
	req.checkBody('name', 'You must supply a name.').notEmpty()
	req.checkBody('email', 'That email is not valid.').isEmail()
	// configure how we want to normalize emails
	req.sanitizeBody('email').normalizeEmail({
		gmail_remove_dots: false,
		remove_extension: false,
		gmail_remove_subaddress: false
	})
	req.checkBody('password', 'Password cannot be empty').notEmpty()
	req.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty()
	req.checkBody('password-confirm', 'Oops! Your passwords don\'t match')
	.equals(req.body.password)

	const errors = req.validationErrors()
	if (errors) {
		res.json({ errors })
	}

	next()
}

exports.register = async (req, res, next) => {
	const spectator = new Spectator({
		name: req.body.name,
		email: req.body.email
	})
	const register = promisify(Spectator.register.bind(Spectator))
	await register(spectator, req.body.password)
	next()
}

exports.addSpectator = (req, res) => {
	
}

exports.updateSpectator = async (req, res) => {
	const updates = {
		name: req.body.name,
		email: req.body.email
	}

	const spectator = await Spectator.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: 'query' }
	)

	res.json({ spectator })
}