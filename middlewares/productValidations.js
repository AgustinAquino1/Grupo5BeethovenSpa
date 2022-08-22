const { body } = require ('express-validator')
const path = require('path');
const db = require('../data/models');
const Users = db.User;

const fImage= (value, { req }) => {
        
  let file = req.files[0]

  let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

  if (!file) {
      
    throw new Error('Tienes que subir una imagen');
    
  } else if(file && file.fieldname == "f_image") {
  
    
    let fileExtension = path.extname(file.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      
      throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join('  ')}`);
    }
  }
  else if(file && file.fieldname == "image") {
    req.files[1] = file

    
    throw new Error('Tienes que subir una imagen');
  }
  else if(file && file.fieldname == "image1") {
    req.files[2] = file

    
    throw new Error('Tienes que subir una imagen');
  }
  else if(file && file.fieldname == "image2") {
    req.files[3] = file

    
    throw new Error('Tienes que subir una imagen');
  }

  return true;
}


const image= (value, { req }) => {
        
  let file1 = req.files[1]


  let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

  if (!file1) {
  
    throw new Error('Tienes que subir una imagen');
  } else if(file1 && file1.fieldname === "image") {
    console.log(file1)
    let fileExtension = path.extname(file1.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      
      throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join('  ')}`);
    }
  }
  else if(file1 && file1.fieldname == "image1") {
    req.files[2] = file1
    throw new Error('Tienes que subir una imagen');
  }
  else if(file1 && file1.fieldname == "image2" ) {
    req.files[3] = file1

    
    throw new Error('Tienes que subir una imagen');
  }
  

  return true;
}


const image1= (value, { req }) => {
        
  let file2 = req.files[2]

  let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

  if (!file2) {
  
    throw new Error('Tienes que subir una imagen');
  } else if(file2 && file2.fieldname === "image1") {
    console.log(file2)
    
    let fileExtension = path.extname(file2.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      
      throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join('  ')}`);
    }
  }
  else if(file2 && file2.fieldname === "image2") {
    req.files[3] = file2

    
    throw new Error('Tienes que subir una imagen');
  }

  return true;
}


const image2= (value, { req }) => {
        
  let file3 = req.files[3]

  let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

  if (!file3) {
  
    throw new Error('Tienes que subir una imagen');
    console.log(file3)
  } else if(file3 && file3.fieldname == "image2"){
    console.log(file3)
    let fileExtension = path.extname(file3.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join('  ')}`);
    }
  }

  return true;
}

const validations= [
    body ('name').isLength({ min: 4 }).withMessage('El nombre debe tener por lo menos 4 letras'),
    body ('brand').isLength({ min: 4 }).withMessage('La marca debe tener por lo menos 4 letras'),
    body (['name','brand','pet_size', 'price', 'stock', 'category_id']).notEmpty().withMessage('Tenés que completar este campo'),
    body(['price', 'stock']).isNumeric().withMessage('Solo podés completar este campo con números'),
    body('pet_size').matches(/(chico|mediano|grande|chica|mediana)$/i).withMessage('Solo podés completar este campo con los tamaños "chico/a", "mediano/a" o "grande"'),
    body('pet_type').matches(/(perro|perra|gato|gata)$/i).withMessage('Solo podés completar este campo con los valores "perro/a" o "gato/a"'),
    body('category_id').matches(/(1|2|3|4)$/i).withMessage('Solo podés completar este campo con los valores "accesorios", "gorumet", "ropa" o "spa"'),
    body ('description').isLength({ min: 20 }).withMessage('La descripción debe tener por lo menos 20 letras'),
    /*body('f_image').custom(fImage),
    body('image').custom(image),
    body('image1').custom(image1),
    body('image2').custom(image2),*/

  ]

  module.exports = validations