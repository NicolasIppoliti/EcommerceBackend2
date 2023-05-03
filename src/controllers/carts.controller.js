import cartsModel from '../models/cartsModel.js';
import productsModel from '../models/productsModel.js';
import _ from 'lodash';

class CartsController {
    constructor() {
        this.cartsModel = cartsModel;
        this.productsModel = productsModel;
    }

    getCarts = async (req, res) => {
        try {
            const carts = await this.cartsModel.find();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Error getting carts' });
        }
    };

    getCartById = async (req, res) => {
        try {
            const cart = await this.cartsModel.findById(req.params.cid);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error getting cart by ID' });
        }
    };

    addCart = async (req, res) => {
        try {
            const newCart = new this.cartsModel({
                _id: req.body._id,
                products: req.body.products,
                total: req.body.total,
            });
            newCart.user = req.user.id;
            await newCart.save();
            res.json({ message: 'Carrito agregado correctamente' });
            req.flash('success_msg', 'Carrito agregado correctamente');
        } catch (error) {
            res.status(500).json({ message: 'Error saving cart' });
        }
    };

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartsModel.findById(cid);
            const product = await this.productsModel.findById(pid);
            cart.products.push({ product });
            await cart.save();
            res.json({ message: 'Producto agregado correctamente al carrito' });
            req.flash('success_msg', 'Producto agregado correctamente al carrito');
        } catch (error) {
            res.status(500).json({ message: 'Error adding product to cart' });
        }
    };    

    updateCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = {
                products: req.body.products,
                total: req.body.total
            };
            await this.cartsModel.findByIdAndUpdate(cid, { $set: cart }, { new: true });
            res.json({ message: 'Carrito actualizado correctamente' });
            req.flash('success_msg', 'Carrito actualizado correctamente');
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart' });
        }
    };

    updateProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartsModel.findById(cid);
            const product = await this.productsModel.findById(pid);
            cart.products.forEach((product) => {
                if (product._id == pid) {
                    product.quantity = req.body.quantity;
                }
            });
            await cart.save();
            res.json({ message: 'Producto actualizado correctamente en el carrito' });
            req.flash('success_msg', 'Producto actualizado correctamente en el carrito');
        } catch (error) {
            res.status(500).json({ message: 'Error updating product from cart' });
        }
    };

    deleteCart = async (req, res) => {
        try {
            await this.cartsModel.findByIdAndRemove(req.params.cid);
            res.json({ message: 'Carrito eliminado correctamente' });
            req.flash('success_msg', 'Carrito eliminado correctamente');
        } catch (error) {
            res.status(500).json({ message: 'Error deleting cart' });
        }
    };

    deleteProductFromCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartsModel.findById(cid);
            cart.products.forEach((product, index) => {
                if (product._id == pid) {
                    cart.products.splice(index, 1);
                }
            });
            await cart.save();
            res.json({ message: 'Producto eliminado correctamente del carrito' });
            req.flash('success_msg', 'Producto eliminado correctamente del carrito');
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product from cart' });
        }
    };

    renderCart = async (req, res) => {
        try {
            const cart = await this.cartsModel.findOne({user: req.user.id}).populate("products.product").sort({ date: 'desc' });
            const products = cart.products.map(product => ({
                _id: product.product._id,
                title: product.product.title,
                price: product.product.price,
                category: product.product.category,
                quantity: product.quantity,
            }));
            res.render('cart', { cart, products });
        } catch (error) {
            res.status(500).json({ message: 'Error getting cart by ID' });
        }
    };
}

export default CartsController;