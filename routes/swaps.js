const swapsRouter = require('express').Router()
const swapController = require('../controllers/swapController')
const { catchErrors } = require('../handlers/errorHandlers')

swapsRouter
	.get('/', catchErrors(swapController.getSwaps))
	.post('/',
		swapController.upload,
		catchErrors(swapController.resize),
		catchErrors(swapController.addSwap)
	)

swapsRouter
	.get('/:id', catchErrors(swapController.getSwap))
	.patch('/:id',
		swapController.upload,
		catchErrors(swapController.resize),
		catchErrors(swapController.updateSwap)
	)

swapsRouter
	.get('/tags/:tag*?', catchErrors(swapController.getSwapTags))

module.exports = swapsRouter