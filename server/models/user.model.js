import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Provide name']
    },
    email: {
        type: String,
        required: [true,'Provide name'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Provide name']
    },
    avatar: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ''
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Active','Inactive', 'Suspended'],
        default: 'Active'
    },
    address_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address',
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cartProduct',
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    },
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);

export default UserModel;