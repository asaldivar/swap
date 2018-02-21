exports.catchErrors = (fn) => {
	return function(req, res, next) {
		console.log('in catchErrors')
		return fn(req, res, next).catch(next)
	}
}