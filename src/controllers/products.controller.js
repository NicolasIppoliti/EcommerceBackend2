import productsModel from '../models/productsModel.js';
import _ from 'lodash';

class ProductsController {
    constructor() {
        this.productsModel = productsModel;
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.productsModel.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error getting products' });
        }
    };

    getProductById = async (req, res) => {
        try {
            const product = await this.productsModel.findById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error getting product by ID' });
        }
    };

    addProducts = async (req, res) => {
        try {
            const newProduct = new this.productsModel({
                title: req.body.title,
                description: req.body.description,
                code: req.body.code,
                price: req.body.price,
                status: req.body.status,
                stock: req.body.stock,
                category: req.body.category,
                thumbnail: req.body.thumbnail
            });
            await newProduct.save();
            res.json({ message: 'Producto agregado correctamente' });
            req.flash('success_msg', 'Producto agregado correctamente');
            res.redirect('/products');
        } catch (error) {
            res.status(500).json({ message: 'Error adding product' });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const product = {
                title: req.body.title,
                description: req.body.description,
                code: req.body.code,
                price: req.body.price,
                status: req.body.status,
                stock: req.body.stock,
                category: req.body.category,
                thumbnail: req.body.thumbnail
            };
            await this.productsModel.findByIdAndUpdate(id, { $set: product }, { new: true });
            res.json({ message: 'Producto actualizado correctamente' });
            req.flash('success_msg', 'Producto actualizado correctamente');
            res.redirect('/products');
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            await this.productsModel.findByIdAndRemove(req.params.id);
            res.json({ message: 'Producto eliminado correctamente' });
            req.flash('success_msg', 'Producto eliminado correctamente');
            res.redirect('/products');
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    };

    renderProducts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sortBy || 'price';
            const sortOrder = req.query.sortOrder || 'asc';
            const search = req.query.search || '';

            const query = search ? { name: new RegExp(search, 'i') } : {};
            const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
            const options = {
                page,
                limit,
                query,
                sort,
                lean: true,
            };
            const products = await this.productsModel.paginate({}, options);
            const productList = products.docs;
            products.prevLink = products.hasPrevPage ? `http://localhost:4000/products?page=${products.prevPage}` : '';
            products.nextLink = products.hasNextPage ? `http://localhost:4000/products?page=${products.nextPage}` : '';
            res.render('products', { 
                products: productList,
                totalPages: products.totalPages,
                currentPage: page,
                sortBy,
                sortOrder,
                search,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.prevLink,
                nextLink: products.nextLink,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error getting products' });
        }
    };
}

export default ProductsController;