import mongoose from "mongoose";    

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT),
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(console.error);
    }
}
export default dbConnect;