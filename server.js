const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');

dotenv.config();

const authRouters = require('./routes/authRoutes');
const carRouters = require('./routes/carRoutes');
const User = require('./models/User');

const app = express();

// middleware 
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',authRouters);
app.use('/api/cars',carRouters);

// connect to the database 
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// create first admin user 

const CreateAdminUser = async() => {
    try{
        const adminEmail = "abc@gmail.com";
        const adminPassword = "abc123";

        // check if there are any users in the database 
        const existingUser = await User.find();

        if (existingUser.length===0){
            const hashedPassword = await bcrypt.hash(adminPassword,10);
            const adminUser = new User({
                email : adminEmail,
                password : hashedPassword,
                role : 'admin'


            })
        
            await adminUser.save();
            console.log("Admin User created successfully");


        }

        else {
            console.log("Admin User Already exist");
        }





    }

    catch(error){
        console.log("Error creating admin user " , error);
    }








}

CreateAdminUser();