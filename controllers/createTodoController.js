const Todo = require('../models/todoSchema');
const User = require('../models/userSchema');

exports.createTodoController = async(req, res)=>{
    try{
        // get info
        const {description} = req.body;
        const userId = req.user._id;

        // if any field is empty return
        if(!userId || !description){
            return res.status(422).json({
                success: true,
                msg: "input fields can not be empty",
                data: null
            })
        }

        // save todo in todo database
        const todo = await Todo.create({
            userId, description
        })

        // insert todo id into post database
        const updatedUser = await User.findByIdAndUpdate(userId, {$push : {
            todos : todo._id
        }}, {new: true}).select('-password');

        // send response
        res.status(201).json({
            success: true,
            msg: "todo created",
            data: updatedUser
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