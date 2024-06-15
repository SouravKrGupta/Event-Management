const db=require('../config/db');
const validator =require('validator')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const passport=require('passport')

//Function to create JWT token
const createToken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
//Register user
const registerUser =async(req,res)=>{
const {name, password, email, street, city, state, zipcode, country, phone} =req.body;
try {
    //check if user already exists
    const [existingUsers]=await db.query('SELECT * FROM users WHERE email = ?',[email]);
    if(existingUsers.length>0){
        return res.status(400).send({
            success:false,
            message:'User already exists'
        })
    }
     // Validate email format
     if (!validator.isEmail(email)) {
        return res.status(400).send({
            success: false,
            message: 'Please enter a valid email',
        });
    }
     // Validate password strength
     if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
        return res.status(400).send({
            success: false,
            message: 'Password must be at least 8 characters long and contain at least one symbol',
        });
    }
     // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     // Insert new user
     const [result] = await db.query('INSERT INTO users (name, email, password, street, city, state, zipcode, country, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email, hashedPassword, street, city, state, zipcode, country, phone]);
     // Generate token
     const token = createToken(result.insertId);

     res.status(201).send({
         success: true,
         message: 'User registered successfully',
         token: token,
         
     });
    
} catch (error) {
    console.error(error);
    res.status(500).send({
        success: false,
        message: 'Error registering user',
        error: error.message,
    });
}
}
// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist',
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Generate token
        const token = createToken(user.id);
        res.send({
            success: true,
            message: 'Login success',
            token: token,
            user:user

        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error logging in',
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, street, city, state, zipcode, country, phone } = req.body;

    try {
        if (!name && !email && !street && !city && !state && !zipcode && !country && !phone) {
            return res.status(400).send({
                success: false,
                message: "At least one field is required to update",
            });
        }

        let updateFields = [];
        if (name) updateFields.push(`name = '${name}'`);
        if (email) updateFields.push(`email = '${email}'`);
        if (street) updateFields.push(`street = '${street}'`);
        if (city) updateFields.push(`city = '${city}'`);
        if (state) updateFields.push(`state = '${state}'`);
        if (zipcode) updateFields.push(`zipcode = '${zipcode}'`);
        if (country) updateFields.push(`country = '${country}'`);
        if (phone) updateFields.push(`phone = '${phone}'`);

        const updateQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
        const [result] = await db.execute(updateQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        res.send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating user data",
            error: error.message,
        });
    }
};

module.exports={
    registerUser,
    loginUser,
    updateUser,
}