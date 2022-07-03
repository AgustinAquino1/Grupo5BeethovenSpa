const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const User = require('../models/User');

const controller = {
	// Root - Show all users
	index: (req, res) => {
		res.render('users', {users});
	},

	

	// profile - Detail from one user
	profile: (req, res) => {
		let id= req.params.id
		let user = users.find(user => user.id == id)
		res.render('profile', {user});
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

			let image
	
			if(req.files[0] != undefined){
	
				image = req.files[0].filename
	
			}
			else {
				image = 'img-principal.png'
			}
			
			let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: image,
			pass: bcryptjs.hashSync(req.body.pass, 10),
            pass2: bcryptjs.hashSync(req.body.pass2, 10)
		
			}

			req.session.id = newUser.id
			req.session.name = newUser.name
			req.session.surname = newUser.surname
			req.session.birth_date = newUser.birth_date
			req.session.domicilio = newUser.domicilio
			req.session.user = newUser.user
			req.session.pass = newUser.pass
			req.session.pass2 = newUser.pass2
			req.session.image = newUser.image
			req.session.email = newUser.email
        
	
	
	
			users.push(newUser)
	
			fs.writeFileSync(usersFilePath, JSON.stringify(users));
			
	
			res.redirect('/')

		}
		let userCreated = User.create(newUser);

		return res.redirect('/user/login');

	},

	// Update - Form to edit
	edit: (req, res) => {

		let id = req.params.id
		let user = users.find (user => user.id ==id)

		res.render('userEdit', {user});
	},
// Update - Method to update
	update: (req, res) => {

		let id = req.params.id
		let userToEdit = users.find (user => user.id ==id)

		const resultValidation = validationResult(req);

		if(resultValidation.errors.length > 0){
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}else{


			let image
	
			if(req.files[0] != undefined){
	
				image = req.files[0].filename
	
			}
			else {
				image = productToEdit.image
			}
			
			productToEdit = {
				id: userToEdit.id,
				...req.body,
				image: image,
				pass: bcryptjs.hashSync(req.body.pass, 10),
				pass2: bcryptjs.hashSync(req.body.pass2, 10)
			}
	
			let newUser = users.map(user => {
				if (user.id == userToEdit.id) {
	
					return user = {...userToEdit}
				}
				return user
			})
	
	
			fs.writeFileSync(usersFilePath, JSON.stringify(newUser));
			res. redirect('/users/detail/' + userToEdit.id)
		}

	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		let id = req.params.id
		let userToDestroy = users.indexOf (users.find(user => user.id == id ))

			users.splice(userToDestroy, 1)
			fs.writeFileSync(usersFilePath, JSON.stringify(users))
			res.redirect('/')
	},
	login: (req, res) => {
        res.render('login')   
    },
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
		
};

module.exports = controller;