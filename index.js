const express=require('express');
const path=require('path');
const port= 8000;


const db = require('./config/moongose');
const Contact =require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware 1
// app.use(function(req,res,next){
//  req.myName='arpan';
// //   console.log('middleware 1 called');
//   next();
// });

//middleware 2
// app.use(function(req,res,next){
//     console.log('myName from mw2' , req.myName);
//     // console.log('middleware 2 called');
//     next();
// });

var contactList=[
    {
        name:'Arpan',
        phone:'9999999999'
    },
    {
        name:'Stark',
        phone:'1234567890'
    },
    {
        name:'jugal',
        phone:'9837747904'
    }

]

app.get('/',function(req,res){
  // console.log(req.myName); middleware
   
  Contact.find({},function(err,contact){
    if (err){
       cpnsole.log('Error in fetching contacts from db');
       return;
    }

     return res.render('home',
 {title:'My Contact List',
 contact_List:contact
  });

  });



});

app.get('/practice',function(req,res){
    return res.render('practice',{title:"Let us play with ejs"});
})



app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name, 
    //     phone:req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    } , function(err, newContact){
        if (err){console.log('error in creating contact!');
         return ;}
     
         console.log('*********' ,newContact);
         res.redirect('back');

    });
    // return res.redirect('/');
});


// for deleting a contact
app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    // get the id from query in the ur

    let id= req.query.phone;
// find the contact in the databse using the id and delete
    Contact.findOneAndDelete(id,function(err){
        if (err){
            console.log('Error in deleting and object from database');
            return;
        }

        return res.redirect('back');

    });

    
});
app.listen(port, function(err){
    if(err){
        console.log('Error is running in the server', err);

    }
    console.log('Yup! my express server is ruuning in the port',port);
});