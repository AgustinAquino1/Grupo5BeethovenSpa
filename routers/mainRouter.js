const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController')


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


router.get("/", mainController.index );
router.post("/", upload.any(), mainController.search); 



module.exports = router;