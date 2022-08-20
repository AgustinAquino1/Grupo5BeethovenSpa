const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Users = db.User;

const Products = db.Product;



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//const simple = Products.filter (product => product.category == "simple product")
//const special = Products.filter (product => product.category == "special product")



const mainController = {

    index: (req, res) => {

        Products.findAll()
		.then(products => {
            if(req.session && req.session.user){
                let data = req.session
                
                res.render('home', {data:data ,products})
            }
    
                res.render('home', {products}) 
		})


    },

 
    search: (req, res) => {
       let findProducts = req.body.searchProducts


        Products.findOne({
            where: {    
                [Op.or]: [
                { name : findProducts  },
                { pet_type : findProducts},
                { pet_size : findProducts},
                { pet_type : findProducts},
                { brand : findProducts},
                { description : findProducts},
                { pet_age : findProducts},
                { breed : findProducts},

              ]}
        })
		.then(products => {
            if(products){
            res.redirect ('/products/detail/' + products.id)
            }else{
                res.send ('No se encontró el producto')

            }

		})
	}

    

}

module.exports = mainController