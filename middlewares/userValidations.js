const { body } = require ('express-validator')
const path = require('path');
const db = require('../data/models');
const Users = db.User;


const validations= [
    body ('name').notEmpty().withMessage('Tenés que completar este campo')
    .isLength({ min: 3 }).withMessage('El nombre debe tener por lo menos 3 letras'),
    body ('surname').notEmpty().withMessage('Tenés que completar este campo')
    .isLength({ min: 3 }).withMessage('El apellido debe tener por lo menos 3 letras'),
    body ('email').notEmpty().withMessage('Tenés que completar este campo').bail()
    .isEmail().withMessage('Debés usar un formato válido del tipo "mail@mail.com"').bail()
    .custom(async (value, {req})=>{

       let email = req.body.email


      const user = await Users.findOne({
        
        where: {
           email: email
         }            
      })
   
      if(user){
        throw new Error('El email ya se encuentra registrado')
      }
      
    
    }),
    body ('adress').notEmpty().withMessage('Tenés que completar este campo'),
    body ('pass').notEmpty().withMessage('Tenés que completar este campo')
    .isStrongPassword({ 
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1 }).withMessage('La contraseña debe tener por lo menos 8 caracteres, una mayúscula, una minúscula, un caracter especial y un número.'),
    body ('pass2').notEmpty().withMessage('Tenés que completar este campo').bail()
    .custom((value, {req})=>{
      let pass  = req.body.pass
      let pass2 = req.body.pass2
			
      if(pass != pass2){
				throw new Error ('Las contraseñas deben coincidir')
			} 
      return true
			}),
      body('avatar').custom((value, { req }) => {
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