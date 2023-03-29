//Importing the fs module
import {promises as fs} from 'fs';

//Importing the nanoid module
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 5);

//Importing the ProductManager class
import ProductManager from './ProductManager.js';

//Creating an instance of ProductManager
const productManager = new ProductManager();

class CartManager {
    constructor() {
        this.path = './src/models/carts.json';
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    }

    existCart = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }

    addCarts = async (cart) => {
        let cartsOld = await this.readCarts();
        let id = Number(nanoid());
        let newCart = [{id : id, products : []}, ...cartsOld];
        await this.writeCarts(newCart);
        return 'Cart added successfully';
    }

    getCartById = async (id) => {
        //Checking if the cart exists
        let cartById = await this.existCart(id);
        if (!cartById) {
            return 'Cart not found';
        }
        return cartById;
    }

    addProductInCart = async (cartId, productId) => {
        //Checking if the cart exists
        let cartById = await this.existCart(cartId);
        if (!cartById) return 'Cart not found';

        //Checking if the product exists
        let productById = await productManager.existProduct(productId);
        if (!productById) return 'Product not found';

        //Getting all the carts except the one we want to modify
        let allCarts = await this.readCarts();
        let cartFilter = allCarts.filter((cart) => cart.id != cartId);

        //Checking if the product is already in the cart
        if (cartById.products.some((prod) => prod.id === productId)) {
            let moreProductsInCart = cartById.products.find((prod) => prod.id === productId);
            moreProductsInCart.quantity ++;
            console.log(moreProductsInCart.quantity);
            let cartsConcat = [cartById, ...cartFilter];
            await this.writeCarts(cartsConcat);
            return 'Product quantity added successfully';
        }
        cartById.products.push({id : productById.id, quantity : 1});
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return 'Product added successfully';
    }
}

export default CartManager;