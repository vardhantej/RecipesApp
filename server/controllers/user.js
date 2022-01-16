import bcrypt from 'bcryptjs'; //used to hash the password
import jwt from 'jsonwebtoken'; //A safe way to store the user in a browser for some time

import User from '../models/user.js';

export const signin = async (req,res)=>{

    const {email, password} = req.body;

    try {
        const existingUser= await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({message: "User does not exist"});
        }

        const isPasswordCorrect= await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"}); //server cannot or will not process the request due to something that is perceived to be a client error
        }

        //if both email and password are correct
        const token= jwt.sign({email: existingUser.email, name:existingUser.name},'test',{expiresIn:'1h'});
        res.status(200).json({result: existingUser,token});

    } catch (error) {
        
        res.status(500).json({message:"Something went wrong"});


    }



}


export const signup = async (req,res)=>{

    const {email, password, confirmPassword, firstName, lastName}=req.body;

    try {
        
        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message:"Passwords don't match"});
        }

        const hashedPassword= await bcrypt.hash(password,12);

        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
        //or const result= new User({email,password:hashedPassword,name:`{firstName} ${lastName}`});


        const token= jwt.sign({email: result.email, name:result.name},'test',{expiresIn:'1h'});

        res.status(200).json({result,token});

    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }

}