const { body } = require ('express-validator')
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const validations= [
    body ('name').notEmpty().withMessage('Tenés que completar este campo'),
    body ('surname').notEmpty().withMessage('Tenés que completar este campo'),
    body ('email').notEmpty().withMessage('Tenés que completar este campo').bail()
    .isEmail().withMessage('Debés usar un formato válido del tipo "mail@mail.com"').bail()
    .custom((value, {req})=>{
      let email = req.body.email
			let findByEmail = users.find(user => user.email === email)
      
      if(findByEmail){
				throw new Error ('el email que quieres utilizar ya se encuentra registrado')
			} 
      return true
			}),
    body ('domicilio').notEmpty().withMessage('Tenés que completar este campo'),
  ]

  module.exports = validations