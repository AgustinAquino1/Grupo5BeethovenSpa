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
            res.redirect("/login")
        }
       let promiseCart = Carts.findOne() 
       //to do buscar carrito por user.id 
       // agregar create , bindear front end
    }
}
