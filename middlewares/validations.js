const { body } = require ('express-validator')
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs= require('bcryptjs');
const db = require('../data/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Users = db.User;


const validations= [
    body ('name').notEmpty().withMessage('Tenés que completar este campo'),
    body ('surname').notEmpty().withMessage('Tenés que completar este campo'),
    body ('email').notEmpty().withMessage('Tenés que completar este campo').bail()
    .isEmail().withMessage('Debés usar un formato válido del tipo "mail@mail.com"')/*.bail()
   /* .custom((value, {req})=>{
      let email = req.body.email
      Users.findOne({
        
        where: {
           email: email
         }            
      })
          
          .then((findByEmail)=>{
      
      if(findByEmail){
				throw new Error ('El email ya está registrado')
			} 
      return true
			})
    })*/,
    //body ('domicilio').notEmpty().withMessage('Tenés que completar este campo'),
    body ('pass').notEmpty().withMessage('Tenés que completar este campo'),
    body ('pass2').notEmpty().withMessage('Tenés que completar este campo').bail()
    .custom((value, {req})=>{
      let pass  = req.body.pass
      let pass2 = req.body.pass2
			
      if(pass != pass2){
				throw new Error ('Las contraseñas deben coincidir')
			} 
      return true
			}),
    /*  body ('user').notEmpty().withMessage('Tenés que completar este campo').bail()
      .custom((value, {req})=>{
        let keepUser   = req.body.user
        let findByUser = users.find(user => user.user === keepUser)
        if(findByUser){
          throw new Error ('El usuario que quieres utilizar ya existe')
        } 
        return true
        })*/

  ]

  module.exports = validations