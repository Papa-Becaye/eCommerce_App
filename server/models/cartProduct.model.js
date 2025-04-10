import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    quantity: {
        type: Number,
        default: 1
    },
},{timestamps: true});

const CartProductModel = mongoose.model('cartProduct', cartProductSchema);
export default CartProductModel;
// The cartProduct model defines the cartProduct schema and exports the CartProduct model.