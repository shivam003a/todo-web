const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next)=>{
    try{
        // fetch jwt token
        const token = req.cookies.todoListCookie;
        
        // token not found, return
        if(!token){
            return res.status(422).json({
                success: false,
                msg: "Access Denied 1",
                data: null
            })
        }

        // verify whether token is valid
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        // if token is invalid, return
        if(!verifyToken){
            return res.status(422).json({
                success: false,
                msg: "Access Denied 2",
                data: null
            })
        }

        // else check if the user with token and email, exist
        const userExist = await User.findOne({email: verifyToken.email,
                        "tokens.token" : token}).
                                        select('-password');
        
        // if does not exist, return
        if(!userExist){
            throw new Error('Access Denied 3');
        }
        // else proceed
        else{
            req.user = userExist;
            next();
        }

    }catch(e){
        console.log(e.message);
        res.status(422).json({
            success: false,
            msg: "Access Denied 4",
            data: null
        })
    }
};

module.exports = authenticate;