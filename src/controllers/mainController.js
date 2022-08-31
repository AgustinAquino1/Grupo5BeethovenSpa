const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Users = db.User;

const Products = db.Product;
const Categories = db.Category;



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const simple = Products.filter (product => product.category == "simple product")
//const special = Products.filter (product => product.category == "special product")



const mainController = {

    index: (req, res) => {
        let promiseProduct = Products.findAll()
		let promiseCategory= Categories.findAll()
	 
		 Promise
		 .all([promiseProduct, promiseCategory])

		.then(([products, categories]) => {
            if(req.session && req.session.user){
                let data = req.session
                
                res.render('home', {data:data ,products, categories})
            }
    
                res.render('home', {products, categories}) 
		})


    },

 
    search: (req, res) => {
       let findProducts = req.body.searchProducts
            if(findProducts == "accesorios"){
                findProducts = "1"
            }
            else if(findProducts == "ropa"){
                findProducts = "2"
            }
            else if(findProducts == "gourmet"){
                findProducts = "3"
            }
            else if(findProducts == "spa"){
                findProducts = "4"
            }

        Products.findAll({include: Categories,
            where: {    
                [Op.or]: [
                { name : {[Op.startsWith]: `${findProducts}`}},
                {category_id:findProducts},
                { pet_type : findProducts},
                { pet_size : findProducts},
                { brand : findProducts},
                { description : findProducts},
                { pet_age : findProducts},
                { breed : findProducts},

              ]}
        })
		.then(products => {
            let productsArray = products
            if(products[0] && findProducts != ""){
                res.redirect (`/products?page=${findProducts}`)
            }
            else{
                res.redirect ('/error')
            }

		})



	}

    

}

module.exports = mainController