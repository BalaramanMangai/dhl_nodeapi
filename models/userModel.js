//const db = require('./db');
const db = require('../db/connection');

const mysql = require('mysql2/promise'); // Import the promise client
const bcrypt = require('bcrypt');

// Fetch all users
const getAllUsers = async (roleId,user_id,login_role) => {
    try {

        let rows = [];

        if (login_role == 3) {
            console.log("login_role",login_role);

            [rows] = await db.query('SELECT * FROM users WHERE role_id = ?', [roleId]);
        } else if (login_role == 2) {
            console.log("login_role",login_role);
            [rows] = await db.query('SELECT * FROM users WHERE agent_id = ? AND role_id = ?', [user_id, roleId]);
        } else {
            throw new Error("Invalid login_role provided.");
        }
        return rows;
    } catch (err) {
        console.error('Error in getAllUsers:', err);
        throw err; // Propagate error to the caller
    }
};


const getAllAgents = async () => {
    try {

        let rows = [];

        [rows] = await db.query('SELECT * FROM users WHERE role_id = ?', [2]);

        return rows;
    } catch (err) {
        console.error('Error agents:', err);
        throw err; // Propagate error to the caller
    }
};
    const insertMember = async (userData) => {

        const connection = await db.getConnection();

        try {

            
            if (!userData || typeof userData !== 'object') {
                throw new Error('Invalid member data provided');
            }
        
            const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt rounds

            console.log('userData',userData);
        const query = `INSERT INTO users 
            (agent_id,role_id, username, password, email,mobile, name, whatsap_number, gpay_number, upi_id,account_name,account_no,bank_name,ifsc_code, district, city, address, status, added_on)
            VALUES (?,?, ?, ?, ?, ?,?, ?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?)`;
           
            const values = [
                userData.agent_id || 0,
            userData.role_id,
            userData.username,
            hashedPassword, // Hash passwords in real implementations
            userData.email,
            userData.mobile,
            userData.name,
            userData.whatsap_number || '0',
            userData.gpay_number || '0',
            userData.upi_id || 0,
                userData.account_name,
                userData.account_no,
                userData.bank_name,
                userData.ifsc_code,            
            userData.district || null,
            userData.city || null,
            userData.address || null,
            userData.status || 1,
            new Date()
        ];
        //const [result] = await db.execute(query, values);
        const [result] = await connection.query(query, values);

        return result.insertId;



          } catch (err) {
            console.error('Error inserting data:', err);
          } finally {
            connection.release();
          }

          

            
};


 const saleProduct = async (userData) => {

        const connection = await db.getConnection();

        try {

            console.log('sale_id',userData.sale_id);
            console.log('userData',userData);

            
            if (!userData || typeof userData !== 'object') {
                throw new Error('Invalid member data provided');
            }

            if(userData.sale_id===0){

                const query = `INSERT INTO sales 
                    (agent_id,user_id,result_time, rupees_category, product_code, no_of_product,sale_by)
                    VALUES (?,?, ?, ?, ?, ?,?)`;           
                    const values = [
                    userData.agent_id || 0,
                    userData.user_id,
                    userData.result_time,
                    userData.rupees_category,
                    userData.product_code,
                    userData.num_products,1];

                    const [result] = await connection.query(query, values);
                    return result.insertId;

            }else{
                    const query = `UPDATE sales SET result_time = ?, rupees_category = ?, 
                        product_code = ?, no_of_product = ? WHERE sale_id = ?`;
                    const values = [
                        userData.result_time,
                        userData.rupees_category,
                        userData.product_code,
                        userData.num_products,
                        userData.sale_id,
                    ];
                    //console.log("Executing UPDATE query", { query, values });
                    const [result] = await connection.query(query, values);
                    return result.affectedRows;
            } 


          } catch (err) {
            console.error('Error inserting data:', err);
          } finally {
            connection.release();
          }

          

            
};

const updateMember = async (userData, userId) => {
    const connection = await db.getConnection();
    try {
        const query = `
            UPDATE users
            SET 
                role_id = ?,
                username = ?,
                email = ?, 
                mobile = ?, 
                name = ?, 
                whatsap_number = ?, 
                gpay_number = ?, 
                upi_id = ?,
                account_name = ?,
                account_no = ?,
                bank_name = ?,
                ifsc_code = ?,
                district = ?, 
                city = ?, 
                address = ?, 
                status = ?
            WHERE user_id = ?
        `;

        const values = [
            userData.role_id,
            userData.username,
            userData.email,
            userData.mobile,
            userData.name,
            userData.whatsap_number || '0',
            userData.gpay_number || '0',
            userData.upi_id || 0,
            userData.account_name,
            userData.account_no,
            userData.bank_name,
            userData.ifsc_code,            
            userData.district || null,
            userData.city || null,
            userData.address || null,
            userData.status || 1, // Default status
            userId // WHERE condition
        ];

        // Execute the query
        //const [result] = await db.execute(query, values);
        const [result] = await connection.query(query, values);
        return result.affectedRows; // Return the number of rows updated
    } catch (err) {
        console.error('Error in updateUser Model:', err);
        throw new Error('Database error occurred while updating user');
    }
};

const findByUsername = async (username) => {        
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const [rows] = await db.execute(query, [username]);
    return rows.length ? rows[0] : null;            
};


const getUserCode = async (roleId) => {
    try {

        let result = [];

        [result] = await db.query('SELECT user_id,role_id,username FROM users WHERE role_id = ? ORDER BY user_id DESC LIMIT 1',[roleId]);

        if (result.length > 0) {

            const userId = result[0].username;

            const numericPart = parseInt(userId.replace(/[^\d]/g, ""), 10); // Removes non-digit characters and converts to integer

// Step 2: Add 1 to the numeric part
const incrementedValue = numericPart + 1;

// Step 3: Reconstruct the new user ID
const prefix = userId.replace(/\d/g, ""); // Removes digits to get the prefix (AGT)
const newUserId = `${prefix}${incrementedValue}`;



            // Step 2: Extract the user_id
            // const lastUserId = result[0].user_id;
            // const RoleId = result[0].role_id;
        
            // const prefix = 'AGT';
            // const newUserId = `${prefix}${lastUserId + 1}`; 
            return newUserId; // Sends plain string MEM19
        } else {
            console.log('No user IDs found in the result.');
        }
        

    } catch (err) {
        console.error('Error agents:', err);
        throw err; // Propagate error to the caller
    }
};


// Export the functions
module.exports = {
    getAllUsers,
    updateMember,
    insertMember,
    findByUsername,
    getAllAgents,
    getUserCode,
    saleProduct
};
