import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
},{timestamps: true});

const CategoryModel = mongoose.model('category', categorySchema);
export default CategoryModel;
// The category model defines the category schema and exports the Category model.