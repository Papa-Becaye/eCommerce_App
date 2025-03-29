import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    orderId: {
        type: String,
        required: [true,'Provide order id'],
        unique: true
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    product_details: [
        {
            name: String,
            Image: String,
        }
    ],
    paymentId: {
        type: String,
        default: ''
    },
    payment_status: {
        type: String,
        default: ''
    },
    delevery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    },
    subTotalAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ''
    },
},{timestamps: true});

const OrderModel = mongoose.model('order', orderSchema);
export default OrderModel;
// The order model defines the order schema and exports the Order model.