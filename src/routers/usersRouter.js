// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const validations = require('../middlewares/userValidations')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const guestMiddleware= require('../middlewares/guestMiddlewares')
const authMiddlewareUnLogged= require('../middlewares/authMiddlewareUnLogged')
const authMiddlewareNotAdmin= require('../middlewares/authMiddlewareNotAdmin')
const authMiddlewareParams= require('../middlewares/authMiddlewareParams')


const multer = require ('multer')

 

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



/*** GET ALL USERS  READ***/ 
router.get('/', authMiddlewareNotAdmin, usersController.index); 


/*** CREATE ONE USER ***/ 
router.get('/register', guestMiddleware, usersController.register); 
router.post('/register', upload.any(), validations, usersController.processRegister); 



/*** GET ONE USER ***/ 
router.get('/profile/:name/', authMiddlewareParams, usersController.profile); 

/*** Login ***/ 

router.get('/login', guestMiddleware, usersController.login); 
router.post('/login', upload.any(), usersController.loginProcess);

// Logout

router.get('/logout/', usersController.logout);

/*** EDIT ONE USER ***/
router.get('/edit/:name', authMiddlewareParams, usersController.edit); 
router.put('/edit/:name', authMiddlewareParams, upload.any(), validations, usersController.update); 


/*** DELETE ONE USER ***/ 
router.delete('/delete/:name', authMiddlewareParams,  usersController.destroy); 

module.exports = router;