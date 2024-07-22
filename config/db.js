const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI); {
            useNewUrlparser: true;
            useUnifiedTopology:true;


        }
        console.log("Mongoose Connected");



    }catch(error){
        console.error("MongoDB connecting error:", error);
        process.exit(1);
    }



};

module.exports = connectDB 