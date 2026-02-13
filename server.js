require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const connecttoDb=require('./database/db');
const homeRoutes=require('./routes/homeroutes');
const adminRoutes=require('./routes/adminroutes')
connecttoDb()
console.log("JWT Secret:", process.env.JWT_SECRET_KEY);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
app.get("/", (req, res) => {
  res.send("Task Management API is running 🚀");
});
