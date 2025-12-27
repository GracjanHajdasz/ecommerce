const express = require('express');
const config = require('dotenv').config();
const { connectDB, disconnectDB } = require('./config/db.js');

//Import Routes
const productRoutes = require('./routes/productRoutes.js');

config();
connectDB();

const app = express();

//API Routes
app.use('/products', productRoutes);

const PORT = 5001;
server = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})