const mongoose = require("mongoose");
require("dotenv");
const dbConnect = () => { 
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("DB CONNECTION SUCCESS"))
        .catch((err) => {
            console.log(`DB CONNECTION ISSUES`);
            console.error(err.message);
            process.exit(1); 
        });
};

// Exporting the dbConnect function for use in other files
module.exports = dbConnect;
