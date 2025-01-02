const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
app.use(express.json());

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use('/users', userRoutes);

app.use('/products', productRoutes);

app.get('/products/getProduct', (req, res) => {
    res.json({ message: 'Product fetched successfully' });
  });

// Start server
const PORT = 5173;
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

