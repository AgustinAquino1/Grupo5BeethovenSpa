// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const validations = require('../middlewares/productValidations')
const authMiddlewareUnLogged= require('../middlewares/authMiddlewareUnLogged')
const authMiddlewareNotAdmin= require('../middlewares/authMiddlewareNotAdmin')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');


const multer = require ('multer')




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "new-file" + Date.now() + path.extname(file.originalname) 
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create',authMiddlewareNotAdmin, productsController.create); 
router.post('/create', upload.any(),authMiddlewareNotAdmin, validations, productsController.store); 




/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id',authMiddlewareNotAdmin, productsController.edit); 
router.put('/edit/:id', upload.any(),authMiddlewareNotAdmin, productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', authMiddlewareNotAdmin, productsController.destroy); 

module.exports = router;