const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainControllers')


router.get("/", mainController.index );

router.get("/login", mainController.login);

router.get("/Cart", mainController.productCart);

router.get("/productDetail", mainController.productDetail);

router.get("/register", mainController.register);



module.exports = router;