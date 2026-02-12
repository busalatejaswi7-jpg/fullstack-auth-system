const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const registerUser=async(req,res)=>{
    try{
const {username,password,role,email}=req.body;
const checkExistinguser=await User.findOne({$or:[{username},{email}]});
if(checkExistinguser){
    return res.status(400).json({
        success:false,
        message:"pls try again,your username matches with the another profile"
    })
}
const salt=await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(password,salt);
const newlyCreated=new User({
    username,
    email,
    password:hashedPassword,
    role:role||'user'
})
await newlyCreated.save();
if(newlyCreated){
     return res.status(200).json({
            success:true,
            message:'user registered successfully'
    });

}else{
res.status(500).json({
            success:false,
            message:'we cant register user'
})
} 
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'something is wrong'

        })     
    }
}
const loginUser=async(req,res)=>{
    try{
 
        const {username,password}=req.body;

        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'user doesnt exist'
            })
        }
        const ispassWordmatch=await bcrypt.compare(password,user.password);
        if(!ispassWordmatch){
            return res.status(400).json({
        success:false,
        message:"invalid credentials"
            });
        }
const accesstoKen=jwt.sign({
    userId:user._id,
    username:user.username,
    role:user.role
},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
res.status(200).json({
            success:true,
            message:'logged successfully',
            accesstoKen
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'something is wrong'

        })
    }
}
module.exports={loginUser,registerUser}

