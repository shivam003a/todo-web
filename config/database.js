const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('DB Connected Successfully')

    }).catch((e)=>{
        console.error(e.message)

    })
}

module.exports = connectDB;