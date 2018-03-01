const passport = require('passport')

exports.login = (req, res) => {
	passport.authenticate('local', (err, spectator) => {
		req.logIn(spectator, () => {
			res.status(err ? 500 : 200).json(err ? { error } : { spectator })
		})
	})(req, res)
}

exports.logout = (req, res) => {
	req.logout()
	res.status(200).json({ spectator: null })
}

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.status(403).json({ message: 'You are not authenticated.' })
}