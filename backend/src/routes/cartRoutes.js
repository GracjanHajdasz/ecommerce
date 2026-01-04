const express = require('express');
const { getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart } = require('../controllers/cartController.js');

const { auth } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.get("/", auth, getCart)
router.post("/add", auth, addToCart)
router.patch("/item/:id", auth, updateCartItem)
router.delete("/item/:id", auth, removeCartItem)
router.delete("/", auth, clearCart)

module.exports = router;