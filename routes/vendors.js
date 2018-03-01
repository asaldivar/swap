const vendorsRouter = require('express').Router()
const vendorController = require('../controllers/vendorController')
const { catchErrors } = require('../handlers/errorHandlers')

vendorsRouter
	.get('/', catchErrors(vendorController.getVendors))
	.post('/', catchErrors(vendorController.addVendor))

vendorsRouter
	.get('/:id', catchErrors(vendorController.getVendor))
	.patch('/:id', catchErrors(vendorController.updateVendor))

module.exports = vendorsRouter