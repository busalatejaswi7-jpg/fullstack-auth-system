const express=require('express');
const router=express.Router();
const authMiddleware=require('../middle-ware/auth middeleware')
const adminMiddleware = require('../middle-ware/admin middleware');
router.get('/welcome',authMiddleware,adminMiddleware,(req,res)=>{
    res.json({
        message:"welcome to the admin page"
    })
})
router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the admin dashboard "
    });
});

module.exports=router; 