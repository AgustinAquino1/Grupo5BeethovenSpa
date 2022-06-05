const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},
	

	// Detail - Detail from one product
	detail: (req, res) => {
		let id= req.params.id
		let product = products.find(product => product.id == id)
		res.render('productDetail', {product});
	},
	
	// Cart
	cart: (req, res) => {
        res.render('productCart')   
    },

	// Create - Form to create
	create: (req, res) => {
		
		res.render('productCreate');
	},
	
	// Create -  Method to store
	store: (req, res) => {



		let image1

		if(req.files[0] != undefined){

			image1 = req.files[0].filename

		}
		else {
			image1 = 'default-image.png'
		}
		
		let image2
		
		if(req.files[1] != undefined){
			
			image2 = req.files[1].filename

		}
		else {
			image2 = 'default-image.png'
		}

		let image3

		if(req.files[2] != undefined){

			image3 = req.files[2].filename

		}
		else {
			image3 = 'default-image.png'
		}

		let image4

		if(req.files[3] != undefined){

			image4 = req.files[3].filename

		}
		else {
			image4 = 'default-image.png'
		}
		
		let newProduct = {
		id: products[products.length - 1].id + 1,
		...req.body,
		image1: image1,
		image2: image2,
		image3: image3,
		image4: image4
	
		}
		products.push(newProduct)

		fs.writeFileSync(productsFilePath, JSON.stringify(products));

		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {

		let id = req.params.id
		let product = products.find (product => product.id ==id)

		res.render('productEdit', {product});
	},
// Update - Method to update
	update: (req, res) => {

		let id = req.params.id
		let productToEdit = products.find (product => product.id ==id)

		let image1

		if(req.files[0] != undefined){

			image1 = req.files[0].filename

		}
		else {
			image1 = 'default-image.png'
		}
		
		let image2
		
		if(req.files[1] != undefined){
			
			image2 = req.files[1].filename

		}
		else {
			image2 = 'default-image.png'
		}

		let image3

		if(req.files[2] != undefined){

			image3 = req.files[2].filename

		}
		else {
			image3 = 'default-image.png'
		}

		let image4

		if(req.files[3] != undefined){

			image4 = req.files[3].filename

		}
		else {
			image4 = 'default-image.png'
		}
		
		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image
		}

		let newProduct = products.map(product => {
			if (product.id == productToEdit.id) {

				return product = {...productToEdit}
			}
			return product
		})


		fs.writeFileSync(productsFilePath, JSON.stringify(newProduct));
		res. redirect('/productDetail' + productToEdit.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id
		let productToDestroy = products.indexOf (products.find(product => product.id == id ))

			products.splice(productToDestroy, 1)
			fs.writeFileSync(productsFilePath, JSON.stringify(products))
			res.redirect('/')
	}
};

module.exports = controller;