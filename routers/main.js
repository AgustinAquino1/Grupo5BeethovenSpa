const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainControllers')


router.get("/", mainController.index );

router.get("/login", mainController.login);



router.get("/register", mainController.register);


router.get('/search', mainController.search); 



module.exports = router;