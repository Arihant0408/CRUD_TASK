if(process.env.NODE_ENV!=="production"){
  require('dotenv').config();
}

//package imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash=require('connect-flash');
const User= require('./models/user');
const nodemailer = require("nodemailer");

//mongoose connection string of demo account
mongoose.connect('mongodb+srv://arihant13:arihant13@mycluster.e9l25.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//using app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// get route for home page
app.get('/',(req,res)=>{
  res.render("index");
});

//add data get route to load form
app.get('/register',(req,res)=>{
  res.render('register');
})

//add data post route to add data to database
app.post('/register',async(req,res)=>{

  const user=new User(req.body);
  await user.save();
  res.redirect('/show');
});


//show all database values route
app.get('/show',async(req,res)=>{
  const allUsers= await User.find();
  res.render('show',{allUsers});
})

//selet data route used by method overloading
app.delete('/delete',async(req,res)=>{
  const id= req.body.id;
  await User.deleteOne({_id: id})
  res.redirect('/show');
})

//update data route used by mehtod overloading
app.put('/update',async(req,res)=>{
  const user=await User.findById(req.body.id);
  console.log(user);
  res.render('update.ejs',{user})
})

//update data post route
app.post('/update/:id',async(req,res)=>{
  const user = await User.findByIdAndUpdate(req.params.id, { ...req.body });
  res.redirect('/show');
})

//sending email from post request sent by sendEmail.js file
app.post('/send-email',async(req,res)=>{
 const ids=req.body.ids;
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  "dugarrarihantt2015@gmail.com",
    pass:  "tueyyalpunqdwpdi"
  }
});
let count=1;
let htmlData=`<table class="table table-hover">
<thead>
  <tr>
    <th scope="col">S.No</th>
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th scope="col">Phone</th>
    <th scope="col">Hobbies</th>
  </tr>
</thead>
<tbody>`;
for(let id of ids)
{
  const user= await User.findById(id);
  htmlData+=`<tr>
  <th scope="row">${count++}</th>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.hobbies}</td>
      </tr>
  `
  
};
htmlData+=`  </tbody>
</table>`;
var mailOptions = {
  from: "dugarrarihantt2015@gmail.com",
  to: "info@redpositive.in",
  subject: 'Sending Email using Node.js',
  html: htmlData
};
transporter.sendMail(mailOptions)

});

//port  number
var port_number = (process.env.PORT || 3000);

app.listen(port_number, () => {
  console.log('Serving on port 3000')
})