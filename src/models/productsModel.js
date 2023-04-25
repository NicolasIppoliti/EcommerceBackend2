import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {  
        type: Boolean,
        required: true,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: Array,
        required: true,
    }},
    {
        timestamps: true,
    }
);    

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productSchema);

export default productsModel;