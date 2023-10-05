const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;