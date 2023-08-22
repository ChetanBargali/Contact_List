// Import the 'name' variable from the 'ejs' module
const { name } = require('ejs');

// Import the 'express' module
const express = require('express');

// Import the 'path' module to handle file paths
const path = require('path');

// Set the port number for the server
const port = 8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact')

const app = express();

app.set('view engine', 'ejs');  // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the views directory path
app.use(express.urlencoded()); // Middleware to parse URL-encoded data

app.use(express.static('assets')); // Serve static assets from the 'assets' folder

/* Middleware 1 (commented out)
app.use(function(req, res, next){
    console.log('middleware 1 is called!');
    next();
}); */

/* Middleware 2 (commented out)
app.use(function(req, res, next){
    console.log('middleware 2 is called!');
    next();
});  */

var contactList = [
    {
        name: "Chetan Bargali",
        phone: "9784512121"
    },
    {
        name: "Gaurav",
        phone: "4568458465"
    },
    {
        name: "Rahul",
        phone: "7894568512"
    }
];

// Route for the home page
app.get('/', async function(req, res) {
    try {
        const contacts = await Contact.find({}).exec();
        return res.render('home', {
            title: "contacts list",
            contact_list: contacts
        });
    } catch (err) {
        console.error('Error fetching contacts from db:', err);
        return res.status(500).send('Internal Server Error');
    }
});


// Route for the practice page
app.get('/practice', function(req, res){
    return res.render('practice',{
        title: "Let us play with ejs."
    });
});

// Route for creating contacts
/*app.post('/create_contacts', function(req, res){

    // contactList.push(req.body); // Add a new contact to the list
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){console.log('error in creating a contact!');
        return;}

        console.log('***********',newContact);
        return res.redirect('back');
    });
    
});   */

// Route for creating contacts
app.post('/create_contacts', async function(req, res){
    try {
        await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        return res.redirect('/');
    } catch (err) {
        console.error('Error creating contact:', err);
        return res.status(500).send('Internal Server Error');
    }
});


// Route for deleting a contact
app.get('/delete-contact/', async function(req, res) {
    try {
        let id = req.query.id; // Get the id number from the query in ul
        await Contact.findByIdAndDelete(id).exec();
        return res.redirect('back'); // Redirect back to the previous page
    } catch (err) {
        console.error('Error deleting contact:', err);
        return res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }
    console.log('Yup! My express server is running on the port', port);
});
