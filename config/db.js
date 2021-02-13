const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECT,{ 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        .then(() => console.log('MongoDB connected'))
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;