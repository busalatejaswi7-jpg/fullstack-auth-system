const express = require('express');
const router = express.Router();
const authMiddleware = require('../middle-ware/auth middeleware');
const Task = require('../models/task');
const { body, validationResult } = require("express-validator");

router.post(
  "/create",
  authMiddleware,

  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Invalid priority"),
  ],

  async (req, res,next) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors.array();
        return next(error);
      }

      const { title, description, priority, dueDate } = req.body;

      const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        createdBy: req.userInfo.userId,
      });

      res.status(201).json({
  success: true,
  data: task
});

    } catch (error) {
       error.message="Error creating task",
      next(error);
    }
  }
);


router.get('/mytasks', authMiddleware, async (req, res) => {
    try {

        const { page = 1, limit = 5, status, priority, sort,search } = req.query;

        const filter = {
            createdBy: req.userInfo.userId
        };
        if(search){
            filter.$or=[
                {title:{$regex:search,$options:"i"}},
                { description: { $regex: search, $options: "i" } }
            ];
                }
            
        

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }
const totalTasks = await Task.countDocuments(filter);
        let query = Task.find(filter);

        if (sort) {
            query = query.sort(sort);
        }

        const tasks = await query
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success:true,
            totalTasks,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTasks / limit),
            data:tasks
        });

    } catch (error) {
       error.message="Error fetching tasks";
        next(errors);
    }
});

router.put('/update/:id',authMiddleware,async(req,res)=>{
    try{
const { title, description, status, priority, dueDate } = req.body;
        const tasks=await Task.findOneAndUpdate(
            {
                
                 _id: req.params.id,
                createdBy: req.userInfo.userId
            },
            {
                title,
                description,
                status,
                priority,
                dueDate
            },
            {new:true}
        );
        if(!tasks){
            const error = new Error("Task not found or not authorized");
  error.statusCode = 404;
  return next(error);
        }
res.status(200).json({
  success: true,
  data: task
});
    }catch (error) {
        next(error);
    }
  });      
  router.delete('/delete/:id',authMiddleware,async(req,res,next)=>{
    try{
        const tasks=await Task.findOneAndDelete(
            {
                 _id: req.params.id,
                createdBy: req.userInfo.userId
            }
        );
        if(!tasks){
            const error = new Error("Task not found or not authorized");
      error.statusCode = 404;
      return next(error);
        }
res.status(200).json({
      success: true,
 data:tasks
    });
    
    }catch (error) {
       next(error);
    }
    

  });      

router.get('/mytasks', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ createdBy: req.userInfo.userId });
    res.json(tasks);
});



module.exports = router;
