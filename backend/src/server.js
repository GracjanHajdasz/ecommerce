const express = require('express');
const { config } = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db.js');

//Import Routes
const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

config();
connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

const PORT = 5001;
server = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})