import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to mongodb database: ', error.message);
        process.exit(1);
    }
}

export default connectDB;
// The connectDB function connects to the MongoDB database using the MONGODB_URI environment variable.