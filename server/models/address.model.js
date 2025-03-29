import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    address_line: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    postalCode: {
        type: Number,
    },
    mobile: {
        type: Number,
    },
    addressStatus: {
        type: boolean,
        default: true
    },
},{timestamps: true});

const AddressModel = mongoose.model('address', addressSchema);
export default AddressModel;
// The address model defines the address schema and exports the Address model.