const Joi = require('joi');

// Define the user schema
const userSchema = Joi.object({
    role_id: Joi.number().required(),   
    agent_id: Joi.string().optional(),       // Required
    username: Joi.string().required(),   
    password: Joi.string().min(6).optional(), // Required with conditions
    email: Joi.string().email().required(),   // Required
    district: Joi.string().allow('').optional(),        // Optional
    city: Joi.string().allow('').optional(),            // Optional
    address: Joi.string().allow('').optional(),      
    status: Joi.number().required(),
    gpay_number: Joi.string().allow('').optional(),  
    upi_id: Joi.string().allow('').optional(),  
    account_name: Joi.string().allow('').optional(),
    account_no: Joi.string().allow('').optional(),
    bank_name: Joi.string().allow('').optional(),
    ifsc_code: Joi.string().allow('').optional(),
    mobile: Joi.string().allow('').optional(),
    name: Joi.string().allow('').optional(),
    whatsap_number: Joi.string().allow('').optional(),
    user_id: Joi.number().allow('').optional(),
});

module.exports = {
    userSchema,
};
