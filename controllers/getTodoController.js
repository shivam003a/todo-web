const User = require('../models/userSchema');

exports.getTodoController = async(req, res)=>{
    try{
        // get id of loggedin person
        const _id = req.user._id;

        // get all todos of above user
        const getTodo = await User.findById(_id)
                                    .select('-password')
                                    .populate('todos')
                                    .exec();
        
        res.status(200).json({
            success: true,
            msg: "todo fetched",
            data: getTodo.todos
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