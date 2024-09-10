const path = require('path');
const express = require('express');
const dotenv = require('dotenv'); 
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');

dotenv.config(); // Load environment variables

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();



// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal Config Route
app.get('/api/config/paypal', (req, res) => 
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Static Files Route
app.use('/uploads', express.static(path.join(__dirname, '/frontend/public/uploads')));

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, resp)=>
        resp.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{
    app.get('/', (req, res) => {
        res.send("API is Running.....");
    });
}


// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));