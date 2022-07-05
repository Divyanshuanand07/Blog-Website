//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is the home page of your blog. To add more blogs, click on the compose button in the navbar. Enjoy posting blogs!";
const aboutContent = "This website is developed by Divyanshu Anand, a student of Thapar Institute of Engineering and Technology by following the tutorials of Angela Yu taught in her Udemy course. The user can post daily blogs and will get updated once pulish button is clicked.";
const contactContent = "You can contact me sending me an email on adivyanshu979@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts=[];
app.get("/",function(req,res){
  res.render("home", {
    startingContent:homeStartingContent,
    posts:posts});
   
})

app.get("/about", function(req,res){
  res.render("about",{about:aboutContent});
})

app.get("/contact", function(req,res){
  res.render("contact",{contact:contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  //console.log(req.body.composeData);
  const post={
    title:req.body.titleData,
    content:req.body.postBody
  };

posts.push(post);
res.redirect("/");

})

app.get("/post/:title", function(req,res){
  const requestedTitle=_.lowerCase(req.params.title);
  posts.forEach(function(post){
    const storedTitle= _.lowerCase(post.title);
    if(requestedTitle===post.title){
      res.render("post",{
        title:post.title,
        content: post.content
      });
    }

    
  });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
