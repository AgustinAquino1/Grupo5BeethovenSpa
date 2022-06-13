// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');


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



/*** GET ALL USERS ***/ 
router.get('/users', usersController.index); 


/*** CREATE ONE USER ***/ 
router.get('/register', usersController.create); 
router.post('/register', upload.any(), usersController.store); 



/*** GET ONE USER ***/ 
router.get('/profile/:id/', usersController.profile); 

/*** EDIT ONE USER ***/
router.get('/edit/:id', usersController.edit); 
router.put('/edit/:id', upload.any(), usersController.update); 


/*** DELETE ONE USER ***/ 
router.delete('/delete/:id', usersController.destroy); 

module.exports = router;