const { body } = require ('express-validator')
const path = require('path');
const db = require('../data/models');
const Users = db.User;
const imageValidation = require('./imageValidation')

const validations= [
    body ('name').notEmpty().withMessage('Tenés que completar este campo')
    .isLength({ min: 4 }).withMessage('El nombre debe tener por lo menos 4 letras'),
    body ('brand').isLength({ min: 4 }).withMessage('La marca debe tener por lo menos 4 letras'),
    body (['color','pet_size', 'price', 'stock']).notEmpty().withMessage('Tenés que completar este campo'),
    body ('description').isLength({ min: 20 }).withMessage('La descripción debe tener por lo menos 20 letras'),
    body(['f_image', 'image','image1','image2']).custom((value, { req }) => {
        
        let file = req.files[0]
 
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
    
        if (!file) {
        
          throw new Error('Tienes que subir una imagen');
        } else {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join('  ')}`);
          }
        }
    
        return true;
      })

  ]

  module.exports = validations