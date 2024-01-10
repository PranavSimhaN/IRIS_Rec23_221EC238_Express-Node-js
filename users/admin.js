require('dotenv').config();
var express=require("express");
var router=express.Router();
var x =require("../Postgresql/function");
var passport=require("passport");

var User=require("../models/user");

let errorMessage="";//To write error message for admin login
let course;


router.get("/admin", async (req, res) => {
    res.render("admin/home_ad.ejs");
});

router.get("/loginadmin", function(req, res){
    res.render("admin/login_ad",{
      Emessage:errorMessage
    });
 });

router.get("/registeradmin", function(req, res){
    res.render("admin/register_ad");
 });

router.get("/coursesadmin", async function(req, res){
    if (req.isAuthenticated()){

        try {
          items = await x.x6();

          items1 = await x.x7();
            // console.log(result);
            res.render("admin/courses_ad", {
              listTitle: "COURSES",
              listItems: items,
              listItems1: items1
            });
          }
        
          catch (err) {
            console.log(err);
          res.redirect("/coursesadmin");

          }

    } else {
      res.redirect("/loginadmin");
    }
  });

router.get("/viewcourse1", async function(req, res){
    if (req.isAuthenticated()){

        try {
          items = await x.x8(course);
            
            res.render("admin/view_courses_ad", {
              listTitle: course,
              listItems: items 
            });
          
          }
        
          catch (err) {
            console.log(err);
            res.redirect("/coursesadmin");
          }

    } else {
      res.redirect("/loginadmin");
    }
  });

router.post("/addcourse", async(req, res) => {
    const title = req.body.title;
    const code = req.body.code;
    const faculty = req.body.faculty;
    const faculty_id = req.body.faculty_id;
    const schedule = req.body.schedule;

    try {

      items = await x.x9(faculty);
            
            
      await x.x10(title,code,items[0].id,faculty,schedule);

      res.redirect("/coursesadmin");
    } 
    catch (err) {
      console.log(err);
    }
  
  });

router.post("/deletecourse", async(req, res) => {
    
    const code = req.body.code;

    try {
            
      await x.x11(code);

      res.redirect("/coursesadmin");
    } 
    catch (err) {
      console.log(err);
    }
  
  });

  router.post("/adddetail", async(req, res) => {
    
    const code = req.body.code;
    const detail = req.body.detail;
    try {
            
      await x.x26(detail,code);
      res.redirect("/coursesadmin");
    } 
    catch (err) {
      console.log(err);
    }
  
  });


router.post("/viewcourse1", async(req, res) => {
    
   
    course = req.body.code;

    if (req.isAuthenticated()){

      try {
          
        items = await x.x12(course);
          // console.log(items.length);

          if(items.length!=0){
          res.render("admin/view_courses_ad", {
            listTitle: course,
            listItems: items 
          });
        }

        else{
          res.redirect("/coursesadmin");
        }
        }
      
        catch (err) {
          console.log(err);
          res.redirect("/coursesadmin");
        }

  } else {
    res.redirect("/loginadmin");
  }
  });

router.post("/registeradmin", function(req, res){ 

        const IsAdmin=req.body.IsAdmin;
        User.register({username: req.body.username}, req.body.password, function(err, user){

            if (err) {
              console.log(err);
              res.redirect("/registeradmin");
            } else {
              passport.authenticate("local")(req, res, function(){
                user.is_admin=true;
                user.save(async function(){
                  res.redirect("/loginadmin");
                  });
              
              });
            }
        });
    });

router.post("/loginadmin", function(req, res){
  
        const user = new User({
            username: req.body.username,
            password: req.body.password
          });
          const email=req.body.username;
          console.log(email);

          
          req.login(user, function(err){
            if (err) {
                console.log(err);
                res.redirect("/loginadmin");
              } else {
                passport.authenticate("local")(req, res, function(){
                User.findOne({username:email}, function(err, foundUser){
                  if (err) {
                    console.log(err);
                  } else {
                    if (foundUser) {
                  
                     if(foundUser.is_admin===true){
                      res.redirect("/coursesadmin");
                     }
                     else{
                      errorMessage="(Login through admin account only)!";
                      console.log(errorMessage);
                      res.redirect("/loginadmin");
                     }
              
                    }
                  }
                });
           
              });

            }
        
        });
    });



module.exports={router};