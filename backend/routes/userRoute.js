const express=require('express')
const passport=require('passport');
const { registerUser, loginUser, updateUser } = require('../controller/userController');

//Router object
const router =express.Router();

//Routes
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/update/:id',updateUser);
module.exports=router