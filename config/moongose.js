// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contactList_db');

// acquire the connection to check if its it sucessfull
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console,'error connecting to db'));

// up and running print the message
db.once('open',function(){
    console.log('Sucessfully connected to the database');
});
