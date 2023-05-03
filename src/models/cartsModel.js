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
                quantity: {
                    type: Number,
                    default: 1
                },
            }
        ],
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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