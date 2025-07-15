import User from "../Models/userModels.js";
import bcryptjs from "bcryptjs";
import jwtToken from "../utils/jwtwebToken.js";

export const userRegister = async(req,res)=>{
    try{
        const{fullname, username, email, gender, password, profilepic} = req.body;
        const user = await User.findOne({username,email});
        if(user) return res.status(400).json({message:"User already exists"});
        const hashPassword = bcryptjs.hashSync(password, 10);
        const profileBoy = profilepic || "https://avatar.iran.liara.run/public/boy?username=${username}";
        const profileGirl = profilepic || "https://avatar.iran.liara.run/public/girl?username=${username}";
        const newUser = await User.create({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        })
        if(newUser){
            await newUser.save();
            jwtToken(newUser._id, res);
        }else{
            return res.status(400).json({message:"User not created"});
        }
        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profilepic: newUser.profilepic,
        })
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const userLogin = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).send({succes:false ,message:"User not found"});
        const comparePass = bcryptjs.compareSync(password, user.password || "");
        if(!comparePass) return res.status(400).send({succes:false, message:"Invalid credentials"});
        
        jwtToken(user._id, res);
        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            message: "Login successfully"
        })
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const userLogOut = async(req,res)=>{
    try{
        res.clearCookie('jwt');
        res.status(200).send({message: "Logout successfully"});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}