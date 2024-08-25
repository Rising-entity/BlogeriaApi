const mongoose = require("mongoose");
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
    
})

module.exports = new mongoose.model("userSchema", user);