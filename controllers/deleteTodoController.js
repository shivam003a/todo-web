const Todo = require('../models/todoSchema');
const User = require('../models/userSchema');

exports.deleteTodoController = async(req, res)=>{
    try{
        // get basic info
        const todo_id = req.body.todo_id;
        const userId = req.user._id;

        // delete todo from todos schema
        const toBeDeleted = await Todo.findOneAndDelete({
            _id: todo_id,
            userId: userId
        })
        
        // remove todo id from user Schema
        if(toBeDeleted){
            await User.findByIdAndUpdate(userId, {
                $pull: {todos : todo_id}
            }, {new: true}).select('-password').select('-tokens');
        }
        else{
            return res.status(422).json({
                success: false,
                msg: "no such todo found",
                data: null
            })
        }
        
        res.status(200).json({
            success: true,
            msg: "todo deleted",
            data: null
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