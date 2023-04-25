import mongoose from "mongoose";

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
            }
        ],
        required: true,
    }},
    {
        timestamps: true,
    }
);

cartSchema.pre('findOne', function() {
    this.populate({ path: 'products.product' });
});

cartSchema.pre('findById', function() {
    this.populate("products.product");
});

const cartsModel = mongoose.model(collectionName, cartSchema);

export default cartsModel;