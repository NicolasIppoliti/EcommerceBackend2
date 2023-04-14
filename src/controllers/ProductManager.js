import { promises as fs } from 'fs';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 5);

class ProductManager {
    constructor() {
        this.path = './src/models/products.json';
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = Number(nanoid());
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return 'Product added successfully';
    }

    async getProducts() {
        try {
            return await this.readProducts();
        } catch (error) {
            console.log('Error loading products:', error);
            return [];
        }
    }

    getProductById = async (id) => {
        let productById = await this.existProduct(id);
        if (!productById) {
            return 'Product not found';
        }
        return productById;
    }

    existProduct = async (id) => {
        let products = await this.readProducts();
        return products.find(product => product.id === id);
    }

    deleteProduct = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(product => product.id === id);
        if (existProduct) {
            let productDeleted = products.filter(product => product.id !== id);
            await this.writeProducts(productDeleted);
            return 'Product deleted successfully';
        }
        return 'Product not found';
    }

    updateProduct = async (id, updatedProduct) => {
        let productById = await this.existProduct(id);
        if (!productById) {
            return 'Product not found';
        }
        await this.deleteProduct(id);
        updatedProduct.id = productById.id;
        let productOld = await this.readProducts();
        let productUpdated = [...productOld, updatedProduct];
        await this.writeProducts(productUpdated);
        return 'Product updated successfully';
    }
}

export default ProductManager;