// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const cartsController = require('../controllers/cartsController');

/*** GET CART BY USER ***/ 
router.get('/', cartsController.index);

/*** CREATE CART FOR USER ***/ 

router.post('/create', cartsController.create); 


module.exports = router ; 