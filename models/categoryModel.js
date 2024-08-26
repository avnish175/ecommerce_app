import mongoose from 'mongoose'
//npm i slugify


const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    }
})

export default mongoose.model("category",categorySchema);