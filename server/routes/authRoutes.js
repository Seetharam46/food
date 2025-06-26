// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const upload = require("../middlewares/upload"); // ✅ Cloudinary upload middleware
const { register, login } = require('../controllers/authController');
router.post('/register', upload.single("image"), register);
router.post('/login', login);

module.exports = router;
