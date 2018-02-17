const router = require('express').Router()
const swapController = require('../controllers/swapController')
const vendorController = require('../controllers/vendorController')
const reviewController = require('../controllers/reviewController')
const { catchErrors } = require('../handlers/errorHandlers')

// **** Swap **** //
// create
router.get('/swap/tags/:tag*?', catchErrors(swapController.getSwapTags))
router.post('/swap/add',
	swapController.upload,
	catchErrors(swapController.resize),
	catchErrors(swapController.addSwap)
)
// read
router.get('/swaps', catchErrors(swapController.getSwaps))
router.get('/swap/:id', catchErrors(swapController.getSwap))
// update
router.patch('/swap/:id',
	swapController.upload,
	catchErrors(swapController.resize),
	catchErrors(swapController.updateSwap)
)

// **** Reviews **** //
router.post('/reviews/:id', catchErrors(reviewController.addReview))

// **** Vendors **** //
// create
router.post('/vendor/add', catchErrors(vendorController.addVendor))
// read
router.get('/vendors', catchErrors(vendorController.getVendors))
router.get('/vendor/:id', catchErrors(vendorController.getVendor))
// update
router.patch('/vendor/:id', catchErrors(vendorController.updateVendor))

module.exports = router