
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const User = db.User;
const Products = db.Product;




const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		Products.findAll()
		.then(products => {
			res.render('products', {products})
		})
	},
	

	// Detail - Detail from one product
	detail: (req, res) => {
		Products.findByPk(req.params.id)
		.then(product => {
			res.render('productDetail', {product})
		})

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

		const resultValidation = validationResult(req);
        

		if(resultValidation.errors.length > 0){
			return res.render('productCreate', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})

		}else{



		let f_image

		if(req.files[0] != undefined){

			f_image = req.files[0].filename

		}
		else {
			f_image = 'default-image.png'
		}
		
		let image
		
		if(req.files[1] != undefined){
			
			image = req.files[1].filename

		}
		else {
			image = 'default-image.png'
		}

		let image1

		if(req.files[2] != undefined){

			image1 = req.files[2].filename

		}
		else {
			image1 = 'default-image.png'
		}

		let image2

		if(req.files[3] != undefined){

			image2 = req.files[3].filename

		}
		else {
			image2 = 'default-image.png'
		}
		
		Products.create({

			...req.body,
			f_image: f_image,
			image: image,
			image1: image1,
			image2: image2
		 
		 })
 
		 .then((product) =>{
 
 
		 res.redirect("/")
			 
		 }) 
		}

	},

	// Update - Form to edit
	edit: (req, res) => {
		Products.findByPk(req.params.id)
		.then(product => {
			res.render('productEdit', {product})
		})
	},
// Update - Method to update
	update: (req, res) => {

		let productId = req.params.id
		

		let f_image

		if(req.files[0] != undefined){

			f_image = req.files[0].filename

		}
		else {
			f_image = 'default-image.png'
		}
		
		let image
		
		if(req.files[1] != undefined){
			
			image = req.files[1].filename

		}
		else {
			image = 'default-image.png'
		}

		let image1

		if(req.files[2] != undefined){

			image1 = req.files[2].filename

		}
		else {
			image1 = 'default-image.png'
		}

		let image2

		if(req.files[3] != undefined){

			image2 = req.files[3].filename

		}
		else {
			image2 = 'default-image.png'
		}
		Products.update({
			
			...req.body,
			f_image: f_image,
		    image: image,
		    image1: image1,
		    image2: image2
	
		},
		{
	
			where: { id: productId }
	
		})
		
		.then(() => res.redirect('/products/detail/' + productId))


	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = req.params.id

		Products.destroy({
	
			where: { id: productId}
	
		}).then(() => res.redirect("/products"))
	}
};

module.exports = controller;