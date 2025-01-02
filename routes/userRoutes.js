const express = require('express');


const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');
const router = express.Router();

// Route to add a new member
router.post('/addMember', validateUser, userController.addMember);
router.get('/getMembers', userController.fetchAllUsers);
router.get('/getAgents', userController.fetchAgents);
router.get('/getUserCode', userController.getUserCode);
router.post('/updateMember', validateUser, userController.updateMember);
router.post('/saleProduct', userController.saleProduct);
router.post('/login', userController.login);

module.exports = router;

