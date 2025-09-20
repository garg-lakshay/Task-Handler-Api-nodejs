import express from 'express';
import prisma from '../DB/db.config.js';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User

router.post('/register',async (req, res)=>{
    const {name , email , password} = req.body;
    try{
        const existingUser =await prisma.user.findUnique({
            where:{email}
        });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password : hashedPassword
            },
        });
        
        res.status(201).json({message:"User registered sucessfully",
            user:{id: user.id, email: user.email}
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Registration failed"});
    }
});

// Login user

router.post('/login', async (req,res) =>{
    const {email, password}= req.body;
    try{
        const user = await prisma.user.findUnique({
            where:{email}
        })
        if(!user){
            return res.status(404).json({message:"Invalid email and password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email and password"});
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(200).json({message:"Login successful", token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Login failed"});
    }
});
export default router;