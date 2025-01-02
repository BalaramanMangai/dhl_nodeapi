const productModel = require('../models/productModel');

// Fetch all users
const getProduct = async (req, res) => {
    try {
        const products = await productModel.getAllProduct();
        
        res.status(200).json(products); // Send the users as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Database error', details: err.message }); // Return error response
    }
};

const saleList = async (req, res) => {

    const user_id = req.query.user_id;

    console.log('req',user_id);

    try {
        const products = await productModel.getsaleList(user_id);
        
        res.status(200).json(products); // Send the users as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Database error', details: err.message }); // Return error response
    }
};
const deleteSale = async (req, res) => {

    try { 

        console.log('delete id ',req.body.sale_id);
       
        const result = await productModel.deleteSale(req.body.sale_id);
        res.status(201).json({
            status: 201,
            message: 'Sale deleted successfully',
            data: result
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            error: err.message
        });
    }

};
    const addProduct = async (req, res) => {
        
        try {       

            const productData = Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => [key, value === '' ? null : value])
            );

            
            const result = await productModel.insertProduct(productData);
            res.status(201).json({
                status: 201,
                message: 'Product added successfully',
                data: result
            });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    }
    const updateProduct = async (req, res) => {
        try {
            console.log('req',req.body);

            const product_id = req.body.product_id; // Get user ID from request parameters
            const productData = req.body; // Get user data from request body


    
            // Check if userId is valid
            if (!product_id) {
                return res.status(400).json({ error: 'Product ID is required' });
            }
    
            const updatedRows = await productModel.updateProduct(productData, product_id); // Call Model function
    
            if (updatedRows === 0) {
                return res.status(404).json({ message: 'product not found or no changes made' });
            }
    
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (err) {
            console.error('Error in updateProduct Controller:', err);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    };
    

    


module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    saleList,
    deleteSale
};
