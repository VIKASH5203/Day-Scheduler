 const express = require("express");
 const bodyParser = require("body-parser");
const mongoose=require("mongoose");
 const date = require(__dirname + "/date.js");


 const app = express();

 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));
 app.set('view engine', 'ejs');

 mongoose.connect("mongodb://localhost:27017/schedulerdb");
 const itemsSchema=new mongoose.Schema({
   name:String
 });

 const Item=mongoose.model("Item",itemsSchema);

 const item1=new Item({
   name:"Solve DSA Questions"
 });
 const item2=new Item({
   name:"Work on Project"
 });
 const item3=new Item({
   name:"CS Fundamentals"
 });

 const defaultItems=[item1,item2,item3];
 //


 let questionList = [];


 app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){
    if(foundItems.length===0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("inserted successfully");
        }
      });
        res.redirect("/");
    }else{
      res.render("list", {listTitle:"Today",newListItems: foundItems});
    }

  });
   // let day = date.getDate();

 });

 //here the post request from the home route is caught
 app.post("/", function(req, res) {
   let itemName = req.body.newItem;
   const item=new Item({
     name:itemName
   })
   item.save();
   res.redirect("/");
 });

 app.get("/questions", function(req, res) {
   res.render("list", {
     listTitle: "DSA Questions",
     newListItems: questionList
   });
 });

 app.post("/work", function(req, res) {
   // let item=req.body.newItem;
   // questionList.push(item);       //bescause post request from frontend is sending data to home route
   res.redirect("/questions");
 });

 app.get("/remember", function(req, res) {
   res.render("remember");
 });


 app.listen(3000, function() {
   console.log("Server has started at port 3000");
 });
