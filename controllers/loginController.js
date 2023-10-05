const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.loginController = async(req, res)=>{
    try{
        const {email, password} = req.body;

        // if any fields are empty, return
        if(!email || !password){
            return res.status(422).json({
                success: false,
                msg: "input fields cannot be empty",
                data: null
            })
        }

        // check whether user exist with above email
        const userExist = await User.findOne({email});

        // if user does not exist, return
        if(!userExist){
            return res.status(422).json({
                success: false,
                msg: "email not registered yet!",
                data: null
            })
        }

        // if user exist, compare password
        const isPasswordMatched = await bcrypt.compare(password, userExist.password);

        // if password does not match, return
        if(!isPasswordMatched){
            return res.status(422).json({
                success: false,
                msg: "invalid credentials",
                data: null
            })
        }

        // password is verified, creating token
        const token = await userExist.genAuthToken();

        // storing cookies
        res.cookie('todoListCookie', token, {
            expires: new Date(Date.now() + 604800000),
        })

        // data for sending to client
        const data = {
            name: userExist.name,
            email: userExist.email,
            _id: userExist._id
        }

        res.status(201).json({
            success: true,
            msg: "user logged in successfully",
            data: data
        })

    }catch(e){
        console.error(e.message);
        res.status(500).json({
            success: false,
            msg: "internal server error",
            data: null
        })
    }
}