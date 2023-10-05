const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
        },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens : [
        {
            token: {
                type: String
            }
        }
    ],
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"
        }
    ]
});

userSchema.methods.genAuthToken = async function(){
    try{
        const token = jwt.sign({
            name: this.name,
            _id: this._id,
            email: this.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '168h'
        });
    
        this.tokens = this.tokens.concat({token});
        await this.save();
    
        return token;

    }catch(e){
        console.error(e.message);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;