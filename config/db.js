// npm i mongoose morgan   used in fetch api
import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongo database ${conn.connection.host}`);
    }catch(err){
        console.log(err);
    }
};

export default connectDB;