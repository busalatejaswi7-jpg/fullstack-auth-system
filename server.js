require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const connecttoDb=require('./database/db');
const homeRoutes=require('./routes/homeroutes');
const adminRoutes=require('./routes/adminroutes')
connecttoDb()
app.listen(3000, () => {
  console.log("Server running");
});
