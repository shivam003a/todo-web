// importing dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

// making instance of the express
const app = express();

// configuring dotenv
dotenv.config();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', require('./routes/router'));

// connection to db
connectDB();

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", function(_, res){
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err){
            res.status(500).send(err);
        }
    )
})

// making a server
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
});