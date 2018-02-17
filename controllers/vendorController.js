const mongoose = require('mongoose')
const Vendor = mongoose.model('Vendor')

exports.addVendor = async (req, res) => {
	const vendor = await (new Vendor(req.body)).save()
	res.json(vendor)
}

exports.getVendors = async (req, res) => {
	const vendors = await Vendor.find()
	res.json(vendors)
}

exports.getVendor = async (req, res) => {
	const vendor = await Vendor.findById({ _id: req.params.id })
	res.json(vendor)
}

exports.updateVendor = async (req, res) => {
	const vendor = await Vendor.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec()

	res.json(vendor)
}