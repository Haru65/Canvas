import express, { Router } from "express";
import data from "../model/schema.js"

const app = express()
const router = express.Router()



router.post("/api/signup",async(req,res)=>{
    const {Name,UserName,Email,Password} = req.body;
    console.log('Login request received:', req.body);
    if(!Name||!UserName|| !Email||!Password) return res.status(400).json({Message:"name email password rerquired"})
        
        
    const User = await data.findOne({ UserName });
    if (User) return res.status(400).json({ message: "User already exists" });
    
    
    const user = await data.create({
        username:req.body.UserName,
        Email:req.body.Email,
        Name:req.body.Name,
        password:req.body.Password,
    })


    console.log("user created",user)
    res.status(200).json("created")
})




router.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await data.findOne({ username });
    

   
});

export default router