//require to library
const mongoose = require('mongoose');

//connected to the database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');

//acquire the connection(to check if it is sucessful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running the print the massege 
db.once('open',function(){
    console.log('successfully connected to database');
});