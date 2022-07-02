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
				throw new Error ('El email que quieres utilizar ya existe')
			} 
      return true
			}),
    body ('domicilio').notEmpty().withMessage('Tenés que completar este campo'),
    body ('pass').notEmpty().withMessage('Tenés que completar este campo'),
    body ('pass2').notEmpty().withMessage('Tenés que completar este campo').bail()
    .custom((value, {req})=>{
      let pass = req.body.pass
      let pass2 = req.body.pass2
			
      if(pass != pass2){
				throw new Error ('Las contraseñas deben coincidir')
			} 
      return true
			}),
      body ('user').notEmpty().withMessage('Tenés que completar este campo').bail()
      .custom((value, {req})=>{
        let keepUser = req.body.user
        let findByUser = users.find(user => user.user === keepUser)
        
        if(findByUser){
          throw new Error ('El usuario que quieres utilizar ya existe')
        } 
        return true
        })

  ]

  module.exports = validations