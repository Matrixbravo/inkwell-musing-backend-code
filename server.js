const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();
const session = require('express-session');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const addUpdateUserDetailsUserRoutes = require('./Controllers/AddUpdateUserDetails/userRoutes');


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a strong, random secret
    resave: false,
    saveUninitialized: true
}));

//Routes
app.get('*', (req, res) => {
    res.status(404).json({
        error: {
            msg: "Invalid path"
        }
    })
});


//User Routes
app.use('/api/user/add-update-blog-details', addUpdateUserDetailsUserRoutes);

var port = process.env.PORT || 8090;
app.listen(port, () => {
    console.log(`Inkwell Musing running on Port ${port}...`);
});