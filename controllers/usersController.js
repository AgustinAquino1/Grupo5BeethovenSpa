const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Users = db.User;








const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	index:(req,res) => {
		db.User.findAll()
		.then(users => {
			res.render('users', {users})
		})

	}
	,

	// profile - Detail from one user
	profile: (req, res) => {
		res.render('profile', {
			user: req.session.userLogged
		});
	},

	//LogOut 
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

	

	// Create - Form to create
	register: (req, res) => {		
		res.render('register');
	},
	
	// Create -  Method to store
	processRegister: (req, res) => {

		const resultValidation = validationResult(req);
        

		if(resultValidation.errors.length > 0){
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})

		}else{

			let avatar
	
			if(req.files[0] != undefined){
	
				avatar = req.files[0].filename
	
			}
			else {
				avatar = 'img-principal.png'
			}

			Users.create({

				...req.body,
				avatar: avatar,
				pass: bcryptjs.hashSync(req.body.pass, 10),
				pass2: bcryptjs.hashSync(req.body.pass2, 10)
				 
				 })
		 
				 .then((user) =>{
		 
		 
				 res.redirect("/users/login")
					 
				 }) 

		}

	},


	// Update - Form to edit
	edit: (req, res) => {
		
		let name = req.params.name
		Users.findOne({
			
			where: {
			   name: name
		   }            
	  })
		.then(user => {
			if(user){

				res.render('userEdit', {user})
			}
			else{
				res.redirect ('/')
			}
		})
	},
// Update - Method to update
	update: (req, res) => {


		let name = req.params.name
		Users.findOne({
			
			where: {
			   name: name
		   }            
	  })
		.then(user => {
			const resultValidation = validationResult(req);
			let userId = user.id
			if(resultValidation.errors.length > 0){
				return res.render('userEdit', {
					errors: resultValidation.mapped(),
					oldData: req.body
				})
			}else{
	
	
				let avatar
		
				if(req.files[0] != undefined){
		
					avatar = req.files[0].filename
		
				}
				else {
					avatar = 'img-principal.png'
				}
				Users.update({
	
					...req.body,
					avatar: avatar,
					pass: bcryptjs.hashSync(req.body.pass, 10),
					pass2: bcryptjs.hashSync(req.body.pass2, 10)
			
				},
				{
			
					where: {id: userId}		
				})
				
				.then(() => res.redirect("/users/login"))
			}
			
		})
		

	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		let userId = req.params.id

		Users.findByPk(userId)
	
		.then( user => res.redirect('/'))
	},
	login: (req, res) => {
        res.render('login')   
    },

	loginProcess:  (req, res) => {
		let email = req.body.email
		Users.findOne({
			
			where: {
			   email: email
		   }            
	  })
        
        .then((userToLogin)=>{
			if (userToLogin){
	
				let passwordValidation = bcryptjs.compareSync(req.body.pass, userToLogin.pass);
				if (passwordValidation){
					delete userToLogin.pass;
					delete userToLogin.pass2;
					req.session.userLogged = userToLogin;
					if(req.body.rememberUser){
						res.cookie('userEmail', req.body.email, {maxAge: (1000 * 120)})
                        
					}
					return res.redirect('/users/profile/'+ userToLogin.name);
				} else{
					res.render('login', {
						errors: {
							pass:{
								msg: 'La contraseña no coincide con el email que deseas ingresar'
							}
						}
					})  
				}
			}
			else{
				res.render('login', {
					errors: {
						email:{
							msg: 'Este email no se encuentra registrado'
						}
					}
				})   
				
			}
		})
       
		

    },
	logout: (req, res) => {
		res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = controller;