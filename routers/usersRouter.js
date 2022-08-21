// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const validations = require('../middlewares/userValidations')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const guestMiddleware= require('../middlewares/guestMiddlewares')
const authMiddleware= require('../middlewares/authMiddleware')


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
router.get('/'/*, authMiddleware*/, usersController.index); 


/*** CREATE ONE USER ***/ 
router.get('/register', guestMiddleware, usersController.register); 
router.post('/register', upload.any(), validations, usersController.processRegister); 



/*** GET ONE USER ***/ 
router.get('/profile/:name/', authMiddleware, usersController.profile); 

/*** Login ***/ 

router.get('/login', guestMiddleware, usersController.login); 
router.post('/login', upload.any(), usersController.loginProcess);

// Logout

router.get('/logout/', usersController.logout);

/*** EDIT ONE USER ***/
router.get('/edit/:name', authMiddleware, usersController.edit); 
router.put('/edit/:name', authMiddleware, upload.any(), validations, usersController.update); 


/*** DELETE ONE USER ***/ 
router.delete('/delete/:id', authMiddleware,  usersController.destroy); 

module.exports = router;