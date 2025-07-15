const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart) cart = await Cart.create({ userId: req.user._id, items: [] });
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = await Cart.create({ userId: req.user._id, items: [] });
    const item = cart.items.find(i => i.productId.equals(productId));
    if (item) item.quantity += 1;
    else cart.items.push({ productId, quantity: 1 });
    await cart.save();
    res.json({ message: 'Added to cart' });
};

exports.updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    const item = cart.items.find(i => i.productId.equals(productId));
    if (item) item.quantity = quantity;
    await cart.save();
    res.json({ message: 'Quantity updated' });
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });
    cart.items = cart.items.filter(i => !i.productId.equals(productId));
    await cart.save();
    res.json({ message: 'Removed from cart' });
};

exports.purchase = async (req, res) => {
    await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
    res.json({ message: 'Products purchased' });
};