import express, { Router } from "express";
import data from "../model/schema.js"
import bcrypt from "bcrypt"
const app = express()
const router = express.Router()



router.post("/api/signup",async(req,res)=>{

    const password = req.body.Password
    const {Name,UserName,Email} = req.body;
    const salt = await bcrypt.genSalt()
    const hashedpass = await bcrypt.hash(password,salt)
    console.log(hashedpass)
        
        
    const User = await data.findOne({ UserName });
    if (User) return res.status(400).json({ message: "User already exists" });
    
    
    const user = await data.create({
        username:req.body.UserName,
        Email:req.body.Email,
        Name:req.body.Name,
        password:hashedpass
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

    const user = await data.findOne({ username:username });
    console.log(user)
    if(!user) return res.json({message:"not found"}).status(500)

    try{
        if(await bcrypt.compare(req.body.password , user.password)){
            res.json({message:"found"})
        }else res.json({message:"not found"})
    }catch{
        res.status(500)
    }
}

   
);

export default router