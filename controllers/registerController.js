const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.registerController = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        // if any fields are empty, return
        if(!name || !email || !password){
            return res.status(422).json({
                success: false,
                msg: "input fields cannot be empty",
                data: null
            })
        }

        // check whether user exist with above email
        const userExist = await User.findOne({email});

        // if user exist, return
        if(userExist){
            return res.status(422).json({
                success: false,
                msg: "email already registered",
                data: null
            })
        }

        // encrypting password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // saving data to mongodb
        const data = await User.create({
            name, email, password: encryptedPassword
        })

        data.password = null;

        res.status(201).json({
            success: true,
            msg: "user registered successfully",
            data: data
        })

    }catch(e){
        console.error(e);
        res.status(500).json({
            success: false,
            msg: "internal server error",
            data: null
        })
    }
}