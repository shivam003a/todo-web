const Todo = require('../models/todoSchema');

exports.isDoneController = async(req, res)=>{
    try{
        // get basic info
        const todo_id = req.body.todo_id;
        const userId = req.user._id;

        // get todo related to the above id
        const markedList = await Todo.findOne({
            _id: todo_id,
            userId: userId
        });

        // if isDone is true, mark it as false and vice-versa
        if(markedList.isDone == false){
            markedList.isDone = true
        }
        else{
            markedList.isDone = false;
        }

        // save updated data to db
        const data = await markedList.save();


        res.status(200).json({
            success: true,
            msg: "marked successfully",
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