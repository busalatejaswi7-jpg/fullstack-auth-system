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
router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  async (req, res,next) => {
    try {
      const User = require("../models/user");
      const Task = require("../models/task");

      const totalUsers = await User.countDocuments();
      const totalTasks = await Task.countDocuments();
      const completedTasks = await Task.countDocuments({ status: "completed" });
      const pendingTasks = await Task.countDocuments({ status: "pending" });

      res.status(200).json({
        success: true,
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks
      });

    } catch(error) {
    
        error.message= "Error fetching analytics"
        next(error);
    }
  }
);


module.exports=router; 