// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const validations = require('../middlewares/productValidations')
const authMiddleware= require('../middlewares/authMiddleware')

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
router.get('/create',authMiddleware, productsController.create); 
router.post('/create', upload.any(), validations, productsController.store); 

router.get("/cart", productsController.cart);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id',authMiddleware, productsController.edit); 
router.put('/edit/:id', upload.any(), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy); 

module.exports = router;