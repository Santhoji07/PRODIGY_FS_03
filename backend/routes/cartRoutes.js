const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getCart, addToCart, updateQuantity, removeFromCart, purchase } = require('../controllers/cartController');

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.post('/update', protect, updateQuantity);
router.post('/remove', protect, removeFromCart);
router.post('/purchase', protect, purchase);

module.exports = router;