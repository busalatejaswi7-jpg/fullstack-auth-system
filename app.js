const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");







const express = require("express");
const authRoutes=require('./routes/auth_routes');
const app = express();
const homeRoutes = require('./routes/homeroutes');
const adminRoutes=require('./routes/adminroutes')
const taskRoutes = require('./routes/taskroutes');
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/tasks', taskRoutes);
const errorMiddleware = require("./middle-ware/errormiddleware");

app.use(errorMiddleware);




app.use(helmet());     
app.use(cors());       
app.use(morgan("dev")); 



app.get("/", (req, res) => {
  res.json({ message: "API running successfully 🚀" });
});

module.exports = app;
