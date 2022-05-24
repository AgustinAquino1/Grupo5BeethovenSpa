const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products');
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('productCreate');
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('productDetail');
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let image

		if(req.files[0] != undefined){

			image = req.files[0].filename

		}
		else {
			image = 'default-image.png'
		}
		let newProduct = {
		id: products[products.length - 1].id + 1,
		...req.body,
		image: image
		}

		products.push(newProduct)

		fs.writeFileSync(productsFilePath, JSON.stringify(products));

		res. redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form');
	},
/*	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	} */
};

module.exports = controller;