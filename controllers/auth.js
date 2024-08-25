const userSchema = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validator = require("validator");
require("dotenv").config();
exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name && !email && !password) {
            return res.status(200).json({
                success: false,
                message: "enter all fields"
            })
        }
        else if (!name && !email) {
            return res.status(200).json({
                success: false,
                message: "enter name and email"
            })
        }
        else if (!email && !password) {
            return res.status(200).json({
                success: false,
                message: "enter email and password"
            })
        }
        else if (!name && !password) {
            return res.status(200).json({
                success: false,
                message: "enter name and password"
            })
        }
        else if (!name ) {
            return res.status(200).json({
                success: false,
                message: "enter name "
            })
        }
        else if (!email ) {
            return res.status(200).json({
                success: false,
                message: "enter email"
            })
        }
        else if (!password ) {
            return res.status(200).json({
                success: false,
                message: "enter password"
            })
        }
        

        const user = await userSchema.findOne({ email: email });
        if (user) {
            return res.status(200).json({
                success: false,
                message: "user already registerd "
            })
        }
     

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        //create user
        const newUser = await userSchema.create({ name, email, password: hashedPassword });
        return res.status(200).json({
            success: true,
            message: "user created succesfully"
        })

    }
    catch (error) {
        console.log("error mesaage: ", error.message)

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(200).json({
                success: false,
                message: "enter your email"
            })
        }
        else if (!password) {
            return res.status(200).json({
                success: false,
                message: "enter password"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(200).json({
                success: false,
                message: "invalid format of email"
            })
        }
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "user not exits please signup first"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: "incorrect password"
            })
        }
        user.password = undefined;
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        const options = {
            expiresIn: '1h', // Token expires in 1 hour
        };
        const token = jwt.sign(payload, process.env.secretKey, options);
        return res.status(200).json({
            success: true,
            message: "login succesfull",
            userData: user,
            token: token
        })
    }
    catch (error) {
        console.log("error in login");
        console.log("error message: ", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}