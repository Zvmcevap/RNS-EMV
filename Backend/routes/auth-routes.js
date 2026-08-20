const authController = require('../controllers/auth-controller');
const express = require('express');

const multer = require('multer');
const path = require('path');
const multerUpload = require('../middlewares/multer-middleware');
const router = express.Router();

        // const storage = multer.diskStorage({
        //   destination: function (req, file, cb) {
        //     cb(null, 'uploads/users/');
        //   },
        //   filename: function (req, file, cb) {
        //     cb(null, Date.now() + '-' + file.originalname);
        //   }
        // });

        // const upload = multer({ storage: storage });

router.post('/signup', multerUpload.single('imageURL'), authController.signup);
router.post('/register', multerUpload.single('imageURL'), authController.signup);
router.post('/signin', authController.signin);
router.post("/login", authController.signin);
module.exports = router;
