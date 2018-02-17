const mongoose = require('mongoose')
const Swap = mongoose.model('Swap')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/')

		if (isPhoto) {
			next(null, true)
		} else {
			next({ message: 'That filetype isn\'t allowed.'})
		}
	}
}

// save image to memory
exports.upload = multer(multerOptions).single('image')

// resize image
exports.resize = async (req, res, next) => {
	if (!req.file) return next()

	// get extensions
	const extension = req.file.mimetype.split('/')[1]
	req.body.image = `${uuid.v4()}.${extension}`
	// resize image
	const image = await jimp.read(req.file.buffer)
	await image.resize(200, jimp.AUTO)
	await image.write(`./public/uploads/${req.body.image}`)

	next()
}

exports.addSwap = async (req, res) => {
	const swap = await (new Swap(req.body)).save()
	res.json(swap)
}

exports.getSwaps = async (req, res) => {
	const swaps = await Swap.find()
	res.json(swaps)
}

exports.getSwap = async (req, res) => {
	const swap = await Swap.findById({ _id: req.params.id })
	res.json(swap)
}

exports.updateSwap = async (req, res) => {
	const swap = await Swap.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec()

	res.json(swap)
}

exports.getSwapTags = async (req, res) => {
	const tag = req.params.tag || { $exists: true }

	const tagsPromise = Swap.getTagsList()
	const swapsPromise = Swap.find({ tags: tag })
	const [tags, swaps] = await Promise.all([tagsPromise, swapsPromise])
	console.log('tags:',tags)
	res.json({ tags, swaps })
}