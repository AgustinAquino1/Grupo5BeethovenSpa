const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Carts = db.Cart;


const User = db.User;

const controller = { 
    index : (req,res) => { 
       const user = res.locals.userLogged
       if (!user) {
            res.redirect("/users/login")
        }
        Carts.findOne({
        where: { 
            user_id: user.id
        }
        }).then(cart => {
            if (!cart) {
                res.render('productCart',[])
            } 
            else {
            
            res.render('productCart', {
                id : cart.id ,
                products : JSON.parse(cart.products)

            })
            }
		      
        })  
       //to do 
       // bindear front end
    },

    create: (req,res) => { 
        const user = res.locals.userLogged
       if (!user) {
            res.redirect("/users/login")
        }
        Carts.create({ 
            user_id : user.id , 
            products : req.body.products 

        })
        
        res.send(201)

    }

}

module.exports = controller
