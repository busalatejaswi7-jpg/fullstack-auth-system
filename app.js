const express = require("express");
const authRoutes=require('./routes/auth_routes');
const app = express();
const homeRoutes = require('./routes/homeroutes');
const adminRoutes=require('./routes/adminroutes')

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);

module.exports = app;
