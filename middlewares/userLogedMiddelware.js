const { body } = require ('express-validator')
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Users = db.User;


function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let email
    
		if(req.cookies.userEmail){
			email = req.cookies.userEmail
		}else{
			email = "undefined"
		}
		
		Users.findOne({
        
			where: {email:email }
			            
		  })
		 
			  
			  .then((userFromCookie)=>{
		  
				if (userFromCookie) {
					req.session.userLogged = userFromCookie;
				}
			
				if (req.session.userLogged) {
					res.locals.isLogged = true;
					res.locals.userLogged = req.session.userLogged;
				}
				next();
		})
	
}
	


	


module.exports = userLoggedMiddleware;