const userModel = require('../models/userModel');
const bcrypt = require('bcrypt'); // For password hashing

// Fetch all users
const fetchAllUsers = async (req, res) => {
    try {
        const roleId = req.query.role_id;
        const user_id = req.query.user_id;
        const login_role = req.query.login_role;
        const users = await userModel.getAllUsers(roleId,user_id,login_role);
        
        res.status(200).json(users); // Send the users as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Database error', details: err.message }); // Return error response
    }
};

// Fetch all users
const fetchAgents = async (req, res) => {
    try {
        const users = await userModel.getAllAgents();
        
        res.status(200).json(users); // Send the users as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Database error', details: err.message }); // Return error response
    }
};
const getUserCode = async (req, res) => {
    try {
        const roleId = req.query.role_id;

        const users = await userModel.getUserCode(roleId);
        
        res.status(200).json(users); // Send the users as JSON
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Database error', details: err.message }); // Return error response
    }
};
    const addMember = async (req, res) => {
        
        try {       

            const memberData = Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => [key, value === '' ? null : value])
            );

            
            const result = await userModel.insertMember(memberData);
            res.status(201).json({
                status: 201,
                message: 'Members added successfully',
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
    const saleProduct = async (req, res) => {
        
        try {       

            const memberData = Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => [key, value === '' ? null : value])
            );

            
            const result = await userModel.saleProduct(memberData);
            res.status(201).json({
                status: 201,
                message: 'Members assigned successfully',
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
    const updateMember = async (req, res) => {
        try {
            //console.log('req',req.body);

            const userId = req.body.user_id; // Get user ID from request parameters
            const userData = req.body; // Get user data from request body


    
            // Check if userId is valid
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
    
            const updatedRows = await userModel.updateMember(userData, userId); // Call Model function
    
            if (updatedRows === 0) {
                return res.status(404).json({ message: 'User not found or no changes made' });
            }
    
            res.status(200).json({ message: 'User updated successfully' });
        } catch (err) {
            console.error('Error in updateMember Controller:', err);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    };
    
    const login = async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Validate input
            if (!username || !password) {
                return res.status(400).json({ success: false, message: 'Username and password are required.' });
            }
    
            // Check if user exists
            const user = await userModel.findByUsername(username); // Replace with your DB logic
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }
    
            // Validate password using bcrypt
            const isValidPassword = validatePassword(password, user.password);
    
            console.log('DB password (hashed):', user.password);
            console.log('Form password (plain):', password);
            console.log('Password match result:', isValidPassword);

            

 

    
            // Handle invalid password
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }
    
            // Exclude sensitive information like password from response
            const { password: _, ...userDetails } = user;
            return res.status(200).json({ success: true, data: userDetails });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    };
    
    const validatePassword = async (plainPassword, hashedPassword) => {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        console.log('Password Match:', isMatch);
        return isMatch;
    };
    // const login = async (req, res) =>{
    //     try {
    //       const { username, password } = req.body;
    
    //       // Validate input
    //       if (!username || !password) {
    //         return res.status(400).json({ success: false, message: 'Username and password are required.' });
    //       }
    
    //       // Check if user exists
    //       const user = await userModel.findByUsername(username);
    //       if (!user) {
    //         return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    //       }
    
    //       // Validate password
    //       const isValidPassword = await bcrypt.compare(password, user.password);

    //       console.log('db password',user.password);
    //       console.log('formpassword',password);
    //       console.log('Boolean',isValidPassword);

    //       if(user.password==password){
    //         const { password: _, ...userDetails } = user;
    //         return res.status(200).json({ success: true, data: userDetails });  
    //       }else{
    //         return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    //       }
    //               } catch (error) {
    //       console.error('Login error:', error);
    //       return res.status(500).json({ success: false, message: 'Internal server error.' });
    //     }
    //   }
    


module.exports = {
    fetchAllUsers,
    addMember,
    updateMember,
    login,
    fetchAgents,
    getUserCode,
    saleProduct
};
