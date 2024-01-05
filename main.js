const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/foodshop");


app.use(express.urlencoded({extended:true}));
app.use("/css",express.static('css'));
app.use(express.static( "public" ) );
app.use(express.json());
app.use(
    session({
        secret:"My secret key",
        saveUninitialized: true,
        resave: true
    })
    );

    // storing session message
    app.use((req, res, next) => {
        res.locals.message = req.session.message;
        delete req.session.message;
        next();
    });

app.set("view engine", "ejs");
app.use("", require("./routes/routes"));

// app.get('/home', (req, res) => {
//     res.send('Hello');
// })

app.listen(3000,()=>{
    console.log(`server is running on http://localhost:3000`);
})