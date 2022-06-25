const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all users
	index: (req, res) => {
		res.render('users', {users});
	},

	login: (req, res) => {
        res.render('login')   
    },

	// profile - Detail from one user
	profile: (req, res) => {
		let id= req.params.id
		let user = users.find(user => user.id == id)
		res.render('profile', {user});
	},
	

	// Create - Form to create
	register: (req, res) => {
		
		res.render('register');
	},
	
	// Create -  Method to store
	processRegister: (req, res) => {



		let image

		if(req.files[0] != undefined){

			image = req.files[0].filename

		}
		else {
			image = 'default-image.png'
		}
		
		let newUser = {
		id: users[users.length - 1].id + 1,
		...req.body,
		image: image,
	
		}

		const resultValidation = validationResult(req);

		users.push(newUser)

		fs.writeFileSync(usersFilePath, JSON.stringify(users));

		res.redirect('/')
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
		}

		let newUser = users.map(user => {
			if (user.id == userToEdit.id) {

				return user = {...userToEdit}
			}
			return user
		})


		fs.writeFileSync(usersFilePath, JSON.stringify(newUser));
		res. redirect('/users/detail/' + userToEdit.id)
	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		let id = req.params.id
		let userToDestroy = users.indexOf (users.find(user => user.id == id ))

			users.splice(userToDestroy, 1)
			fs.writeFileSync(usersFilePath, JSON.stringify(users))
			res.redirect('/')
	}
};

module.exports = controller;