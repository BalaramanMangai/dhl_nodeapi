//const db = require('./db');
const db = require('../db/connection');

const mysql = require('mysql2/promise'); // Import the promise client


// Fetch all users
const getAllProduct = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM product');
        return rows; // Return the fetched data
    } catch (err) {
        console.error('Error in getproducts:', err);
        throw err; // Propagate error to the caller
    }
};

const getsaleList = async (user_id) => {
    try {
        const [rows] = await db.query('SELECT * FROM sales WHERE user_id = ?', [user_id]);
        return rows; // Return the fetched data
    } catch (err) {
        console.error('Error in getproducts:', err);
        throw err; // Propagate error to the caller
    }
};

    const insertProduct = async (productData) => {
        if (!productData || typeof productData !== 'object') {
                throw new Error('Invalid productData data provided');
            }
        
        const query = `INSERT INTO product 
            (product_name, product_price, category, status,added_on)
            VALUES (?, ?, ?, ?, ?)`;
           
            const values = [
                productData.product_name,
                productData.product_price,
                productData.category,
                productData.status,
                new Date()
            ];
        const [result] = await db.execute(query, values);
        return result.insertId;
            
};
const deleteSale = async (productId) => {
    try {
        const query = `DELETE FROM sales WHERE sale_id = ?`;
        const values = [productId];
        
        const [result] = await db.execute(query, values);

        return result.affectedRows;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};


const updateProduct = async (productData, productId) => {
    try {
        const query = `
            UPDATE product
            SET 
                product_name = ?,
                product_price = ?,
                category = ?, 
                status = ?
            WHERE product_id = ?
        `;

        // Array of values to bind to the query
        const values = [
            productData.product_name,
            productData.product_price,
            productData.category,
            productData.status,
            productId
        ];

        // Execute the query
        const [result] = await db.execute(query, values);
        return result.affectedRows; // Return the number of rows updated
    } catch (err) {
        console.error('Error in updateUser Model:', err);
        throw new Error('Database error occurred while updating user');
    }
};


// Export the functions
module.exports = {
    getAllProduct,
    updateProduct,
    insertProduct,
    getsaleList,
    deleteSale
};
