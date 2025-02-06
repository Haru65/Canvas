
import mongoose from "mongoose";

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/canvas';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(()=>{
    console.log("mongodb connected")
})
const dataset = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true 
    },
    Name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const data = mongoose.model("data",dataset)





export default data