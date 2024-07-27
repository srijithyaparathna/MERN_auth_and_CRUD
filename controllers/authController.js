const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { message } = require('laravel-mix/src/Log');


// Register new user
const register = async(req,res) => {
    const {email , password , role}= req.body;

    const requestRole = req.User.role;

    try{
        if (requestRole!=='admin'&& role==='admin') {
            return res.status(403).json({message:"admin can register admin users"});
        }

        const newRole = requestRole=='admin'?role:'user';
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({email,password:hashedPassword,role : newRole})
        await user.save();

        res.status(201).json({message:'User registerd successfully'});



    }
    catch (error){
        res.status(400).json({message:error.message})
    }



}
// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

       

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };
