const router = require('express').Router()
const swapController = require('../controllers/swapController')
const vendorController = require('../controllers/vendorController')
const spectatorController = require('../controllers/spectatorController')
const authController = require('../controllers/authController')
const reviewController = require('../controllers/reviewController')
const { catchErrors } = require('../handlers/errorHandlers')

// **** Swap **** //
router.get('/swap/tags/:tag*?', catchErrors(swapController.getSwapTags))
router.post('/swap/add',
	swapController.upload,
	catchErrors(swapController.resize),
	catchErrors(swapController.addSwap)
)
router.get('/swaps', catchErrors(swapController.getSwaps))
router.get('/swap/:id', catchErrors(swapController.getSwap))
router.patch('/swap/:id',
	swapController.upload,
	catchErrors(swapController.resize),
	catchErrors(swapController.updateSwap)
)

// **** Reviews **** //
router.post('/reviews/:id', catchErrors(reviewController.addReview))

// **** Vendors **** //
router.post('/vendor/add', catchErrors(vendorController.addVendor))
router.get('/vendors', catchErrors(vendorController.getVendors))
router.get('/vendor/:id', catchErrors(vendorController.getVendor))
router.patch('/vendor/:id', catchErrors(vendorController.updateVendor))

// **** Spectators **** //
router.post('/spectator', catchErrors(spectatorController.addSpectator))
router.get('/spectators', catchErrors(spectatorController.getSpectators))
router.patch('/spectator/:id', catchErrors(spectatorController.updateSpectator))
router.get('/spectators/:id', catchErrors(spectatorController.getSpectator))
router.post('/register',
	spectatorController.validateRegister,
	spectatorController.register,
	authController.login
)

module.exports = router