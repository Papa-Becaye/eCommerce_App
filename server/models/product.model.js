import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Provide name']
    },
    image: {
        type: String,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subCategory',
        }
    ],
    unit: {
        type: String,
        default: ''
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        required: [true,'Provide description']
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ''
    },
    more_details: {
        type: Object,
        default: {}
    },
    published: {
        type: Boolean,
        default: true
    },

},{timestamps: true});

const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
// The product model defines the product schema and exports the Product model.