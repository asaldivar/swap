const vendorsRouter = require('./vendors')
const swapsRouter = require('./swaps')

module.exports = app => {
	app.use('/api/swaps', swapsRouter)
	app.use('/api/vendors', vendorsRouter)
}