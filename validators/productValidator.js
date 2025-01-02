const Joi = require('joi');

// Define the user schema
const ProductSchema = Joi.object({
    category: Joi.string().required(),          // Required
    product_name: Joi.string().required(),   
    product_price: Joi.string().required(), // Required with conditions
    status: Joi.string().required(),   // Required
});

module.exports = {
    ProductSchema,
};
