const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { parse } = require('path');
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
                res.render('productCart',{
                    products : []                    
                })
            } 
            else {
            
            res.render('productCart', {
                id : cart.id ,
                products : JSON.parse(cart.products)

            })
            }
		      
        })  
       
    },

    create: (req,res) => { 
        
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
                Carts.create({ 
                    user_id : user.id , 
                    products : JSON.stringify([req.body]) 
        
                })
            }
            else { 
                const parseCart = JSON.parse(cart.products)
                //const parseBody = JSON.parse(req.body)
                parseCart.push(req.body)
                cart.set({ 
                    products : JSON.stringify(parseCart)

                })
                cart.save()
            }
            res.send(201)
        })
                                
    },
    delete : (req , res) => {  
        const user = res.locals.userLogged
        if (!user) {
            res.redirect("/users/login")
        }
        Carts.findOne({
            where: { 
                user_id: user.id
            }
        }).then(cart => { 
            
            if (cart) { 
                cart.destroy()
                res.send(200)
            }
        })

    }


}

module.exports = controller
