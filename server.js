
require('dotenv').config()
const express=require("express");
const ejs=require("ejs");
const expresslayouts=require("express-ejs-layouts");
const mongoose=require("mongoose");
const session=require("express-session")
const flash=require("express-flash")
const mongodbstore=require("connect-mongo")(session)



const app=express();



let mongostore =new mongodbstore({
    mongooseConnection: mongoose.connection,
    collections:"sessions"
})
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: mongostore,
    saveUninitialized:false,
     cookie:{maxAge:1000*60*60*24} //24hrs
    
}))
app.use(flash())
  



//                                     DATABASE                                               //





mongoose.connect("mongodb://localhost:27017/pizza",{useNewUrlParser:true, useUnifiedTopology: true });
const connection=mongoose.connection;
const menuSchema=new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    size:{type:String, required:true}

})
const Menu=mongoose.model('Menu', menuSchema);

const pizza1=new Menu({
    name:"Margherit",
    image:"Margherit.jpg",
    price:"200",
    size:"medium"
})
const pizza2=new Menu({
    name:"Farmhouse",
    image:"Farmhouse.jpg",
    price:"250",
    size:"small"
})
const pizza3=new Menu({
    name:"Tandoori Paneer",
    image:"IndianTandooriPaneer.jpg",
    price:"220",
    size:"medium"
})
const pizza4=new Menu({
    name:"Mexican Greenwave",
    image:"MexicanGreenWave.jpg",
    price:"200",
    size:"small"
})
const pizza5=new Menu({
    name:"Peppy Paneer",
    image:"Peppy_Paneer.jpg",
    price:"250",
    size:"medium"
})
const pizza6=new Menu({
    name:"Veggie Paradise",
    image:"DigitalveggieParadise.jpg",
    price:"300",
    size:"medium"
})
const pizza7=new Menu({
    name:"Corn&Cheese",
    image:"Corn&Cheese.jpg",
    price:"150",
    size:"medium"
})
const pizza8=new Menu({
    name:"Deluxe Veggie",
    image:"Deluxe_Veggie.jpg",
    price:"300",
    size:"medium"
})

const defaultitem=[pizza1,pizza2,pizza3,pizza4,pizza5,pizza6,pizza7,pizza8];
// Menu.insertMany(defaultitem, function(err){
//    if(err){
//      console.log(err);
//  }else{
//     console.log("success");
//   mongoose.connection.close();
//   }

//  });


//                                           ROUTES                                               //




app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get("/",function(req,res){
    Menu.find({},function(err,pizzas){

        res.render("home",{pizzas:pizzas});
    })
})

app.get("/cart",function(req,res){
    res.render("cart");
})
app.get("/login",function(req,res){
    res.render("login");
})
app.get("/register",function(req,res){
    res.render("register");
})



app.post("/update-cart",function(req,res){
    res.render("cart").update()
  
})



app.listen(3000,function(req,res){
    console.log("server started");
})