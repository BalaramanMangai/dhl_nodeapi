const Joi = require('joi'); // Ensure Joi is installed and imported

const productSchema = Joi.object({
  product_name: Joi.string().min(3).required(),
  product_price: Joi.number().positive().required(),
  category: Joi.string().required(),
  status: Joi.string().valid('Active', 'Inactive', 'Pending').required(),
  product_id: Joi.number().optional(),
});

function validateProduct(req, res, next) {
  const { error } = productSchema.validate(req.body); // Validate req.body against schema
  if (error) {
    return res.status(400).send(error.details[0].message); // Send error response if validation fails
  }
  next(); // Proceed to the next middleware if validation passes
}

module.exports = validateProduct;
