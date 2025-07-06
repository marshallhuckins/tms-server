const mongoose = require('mongoose');

async function testConnection() {
    try {
        await mongoose.connect('mongodb://web335Admin:Password01@ac-descatx-shard-00-00.ebh5hd3.mongodb.net:27017,ac-descatx-shard-00-01.ebh5hd3.mongodb.net:27017,ac-descatx-shard-00-02.ebh5hd3.mongodb.net:27017/tms?ssl=true&replicaSet=atlas-wl3jd0-shard-0&authSource=admin');
        console.log("MongoDB connection successful");
        process.exit(0);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

testConnection();
