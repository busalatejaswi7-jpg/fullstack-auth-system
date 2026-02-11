const express=require('express');
const router=express.Router();
const authMiddleware=require('../middle-ware/auth middeleware')
router.get('/welcome',authMiddleware,(req,res)=>{
    res.json({
        message:'welcome to the home page'
    })
})
module.exports=router