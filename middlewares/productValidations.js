const { body } = require ('express-validator')
const path = require('path');
const db = require('../data/models');
const Users = db.User;

const validations= [
    body ('name').isLength({ min: 4 }).withMessage('El nombre debe tener por lo menos 4 letras'),
    body ('brand').isLength({ min: 4 }).withMessage('La marca debe tener por lo menos 4 letras'),
    body (['name','brand','pet_size', 'price', 'stock', 'category']).notEmpty().withMessage('Tenés que completar este campo'),
    body(['price', 'stock']).isNumeric().withMessage('Solo podés completar este campo con números'),
    body('pet_size').matches(/(chico|mediano|grande|chica|mediana)$/i).withMessage('Solo podés completar este campo con los tamaños "chico/a", "mediano/a" o "grande"'),
    body('pet_type').matches(/(perro|perra|gato|gata)$/i).withMessage('Solo podés completar este campo con los valores "perro/a" o "gato/a"'),
    body('category').matches(/(ropa|accesorios|gourmet|spa)$/i).withMessage('Solo podés completar este campo con los valores "accesorios", "gorumet", "ropa" o "spa"'),
    body ('description').isLength({ min: 20 }).withMessage('La descripción debe tener por lo menos 20 letras'),
    body(['f_image', 'image','image1','image2']).custom((value, { req }) => {
        
        let file

        for(let i = 0; i < req.files.length; i++){
          file = req.files[i]
        }
 
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
    
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