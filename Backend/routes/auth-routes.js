const authController = require('../controllers/auth-controller');
const express = require('express');

const multer = require('multer');
const path = require('path');
const multerUpload = require('../middlewares/multer-middleware');
const router = express.Router();

router.post('/signup', multerUpload.single('imageURL'), authController.signup);
router.post('/register', multerUpload.single('imageURL'), authController.signup);
router.post('/signin', authController.signin);
router.post("/login", authController.signin);
module.exports = router;
