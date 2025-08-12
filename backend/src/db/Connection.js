const mongoose = require("mongoose");

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        await mongoose.connect(process.env.MONGODB_URL, connectionParams);
        console.log("✅ Connected to Database");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); 
    }
};
