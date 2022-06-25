// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require ('express-validator')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');


const multer = require ('multer')

const validations= [
  body ('name').notEmpty().withMessage('Tenés que completar este campo'),
  body ('surname').notEmpty().withMessage('Tenés que completar este campo'),
  body ('email').notEmpty().withMessage('Tenés que completar este campo'),
  body ('domicilio').notEmpty().withMessage('Tenés que completar este campo'),
]


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "new-file" + Date.now() + path.extname(file.originalname) 
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



/*** GET ALL USERS ***/ 
router.get('/', usersController.index); 


/*** CREATE ONE USER ***/ 
router.get('/register', usersController.register); 
router.post('/register', upload.any(), validations, usersController.processRegister); 

/*** Login ***/ 

router.get('/login', usersController.login); 


/*** GET ONE USER ***/ 
router.get('/profile/:id/', usersController.profile); 

/*** EDIT ONE USER ***/
router.get('/edit/:id', usersController.edit); 
router.put('/edit/:id', upload.any(), usersController.update); 


/*** DELETE ONE USER ***/ 
router.delete('/delete/:id', usersController.destroy); 

module.exports = router;