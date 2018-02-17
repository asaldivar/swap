exports.catchErrors = (fn) => {
	return function(req, res, next) {
		console.log('in here')
		return fn(req, res, next).catch(next)
	}
}