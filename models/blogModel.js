const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userSchema",  // Reference to the User model
        // required: true,
    },
    // image: {
    //     type: String,
    //     default: "#"
    // },
    firebaseImageUrl: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        // required:true
    },
 
},
    { timestamps: true }
);

module.exports = mongoose.model("realblog", blogSchema);
