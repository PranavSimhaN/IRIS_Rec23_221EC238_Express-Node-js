require('dotenv').config();
var express=require("express");
var router=express.Router();
const session = require("express-session"); 
var x =require("../Postgresql/function");
var passport=require("passport");


const GoogleStrategy = require('passport-google-oauth20').Strategy;


const client = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
const nodemailer = require('nodemailer');


var User=require("../models/user");
var Counter = require("../models/counter");
var Counter1= require("../models/counter1");

let current_student_id;
let glogin;
let goo_id;
let hide="";
let errorMessage;


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    console.log(profile.id);
    // console.log(student.glogin);
    
  
    if(glogin==0){
  
    Counter.findOneAndUpdate(
      {code:"autoval"},
      {"$inc":{"seq":1,"id":1}},
      {new:true},(err,cd)=>{
          
          let seqID;
          let ID;
          if(cd==null)
          {
              const newval = new Counter({code:"autoval",seq:2310001,id:1});
              newval.save();
              seqID=2310001;
              ID=1;
          }else{
              seqID=cd.seq;
              ID=cd.id;
          }
           Student_id=seqID;
           id1=ID;
      }
  
  
  )
    }
  
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      goo_id=user.googleId;
      return cb(err, user);
      
    });
  }
  ));


router.get("/reg", function(req, res){
    res.render("student/google_reg");
 });

router.post("/reg", function(req, res){
    const  name=req.body.name; 
    const department=req.body.branch;
    const  program=req.body.program;
    const  Student_ID=req.body.Student_ID;
    
    User.findOne({Student_ID:Student_ID}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
         foundUser.name=name;
         foundUser.program=program;
         foundUser.department=department;
          
         foundUser.save(async function(){
          await x.x1(name,program,department);
          res.redirect("/coursesstudent");
        });
  
        }
      }
    });
  });
  
router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

router.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    if(glogin==0){

    User.findOne({ googleId: goo_id}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.Student_ID=Student_id;
          foundUser.stu_id=id1;
          
         foundUser.save(async function(){
          
          res.redirect("/reg");
        });
  
        }
      }
    });
  }

  else{
    User.findOne({ googleId:goo_id}, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          current_student_id=foundUser.stu_id;
          console.log(current_student_id)
          hide=foundUser.c_button;
          res.redirect("/coursesstudent"); 
        }
      }
    });
  }
  });

router.get("/student", async (req, res) => {
    res.render("student/home_st.ejs");
});

router.get("/registerstudent", function(req, res){
    glogin=0;
    res.render("student/register_st");
 });

router.get("/loginstudent", function(req, res){
    glogin=1;
    // current_student_id=null;
    res.render("student/login_st");
 });

router.post("/registerstudent", function(req, res){

    const  name=req.body.name; 
    const department=req.body.branch;
    const  program=req.body.program;
    const phone_number=req.body.phone_number;
    const user_name=req.body.username;
    
    if(req.body.conpassword===req.body.password && name!="NULL"){

Counter.findOneAndUpdate(
{code:"autoval"},
{"$inc":{"seq":1,"id":1}},
{new:true},(err,cd)=>{
  
  let seqID;
  let ID;
  if(cd==null)
  {
      const newval = new Counter({code:"autoval",seq:2310001,id:1});
      newval.save();
      seqID=2310001;
      ID=1;
  }else{
      seqID=cd.seq;
      ID=cd.id;
  }
    
  const  Student_ID=seqID;
  const  id=ID;

  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.render("student/register_st");
      } else {
        passport.authenticate("local")(req, res, async function(){
          user.name=name;
          user.department=department;
          user.program=program;
          user.Student_ID=Student_ID;
          user.stu_id=id;
          user.phone_number=phone_number;
        
          user.save(async function(){

            client.messages
            .create({
              from: "+12242314978",
              to:phone_number,
              body: "Hello "+name+", "+Student_ID+" is your Student_ID."+"   From IRIS NITK",
            })
            .then(function(res) {console.log("message has sent!")})
            .catch(function(err)  {
              console.log(err);
            });

            const msg = {
              from: "simhapranav.3@gmail.com",
              to: user_name,
              subject: "IRIS NITK",
              text: "Hello "+name+", "+Student_ID+" is your Student_ID."+"From IRIS NITK"
              };
              
              nodemailer.createTransport({
              service: 'gmail',
              auth: {
              user: "simhapranav.3@gmail.com",
              pass: process.env.NODE_MAIL_PASSCODE
              },
              port: 465,
              host: 'smtp.gmail.com'
              })
              
              .sendMail(msg , (err)=>{
              if (err) {
              return console.log('Error occurs', err);
              }else{
              return console.log('Email Sent');
              }
              });



            await x.x1(name,program,department);
              console.log(name);
              res.redirect("/loginstudent");
            });
        });
      }
  });

}

)
    }
    
else{
  errorMessage="(Fill all the details and match both passwords)";
      console.log(errorMessage);
      res.render("student/register_st");

}

});

router.post("/loginstudent", function(req, res){

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        Student_ID:req.body.Student_ID
      });

      User.findOne({Student_ID: user.Student_ID}, function(err, foundUser){
        if (err) {
          res.redirect("loginstudent");
        } else {
          if (foundUser) {
            if (foundUser.username === user.username) {
                current_student_id=foundUser.stu_id;
                hide=foundUser.c_button;
                console.log(current_student_id);
             
                req.login(user, function(err){
                    if (err) {
                        console.log(err);
                        res.redirect("loginstudent");
                      } else {
                    passport.authenticate("local")(req, res, function(){
                        res.redirect("/coursesstudent");
                      });
                    }
                });
            }
            else{
                res.redirect("loginstudent");
            }
          }
        }
      }); 


});

router.get("/coursesstudent", async function(req, res){
    if (req.isAuthenticated()){
            res.render("student/courses_st",{hidden:hide});
    } else {
      res.redirect("/loginstudent");
    }
  });

router.get("/courseregistration", async function(req, res){
    if (req.isAuthenticated()){

        try {
          let items = await x.x2();

            res.render("student/course_reg_st",{listItems: items,
              CError:courseError
            });
          }
        
          catch (err) {
            console.log(err);
          }

    } else {
      res.redirect("/loginstudent");
    }
  });

  let courseError="";

router.post("/courseregistration", async function(req, res){
    // hide="hidden";
    const code1=req.body.code1;
    const code2=req.body.code2;
    let user_name;
    console.log(code1);
    console.log(code2);

    if(code1!=code2){
      console.log("done");
    User.findOne({stu_id:current_student_id}, function(err, foundUser){
     if (err) {
       console.log(err);
     } else {
       if (foundUser) {
        foundUser.c_button="hidden";
        hide=foundUser.c_button;
        name1=foundUser.name;
        user_name=foundUser.username;
      
        const msg = {
          from: "simhapranav.3@gmail.com",
          to:user_name,
          subject: "IRIS NITK",
          text: "Hello "+name1+", "+"You registered for the courses "+code1+" and"+code2+".From IRIS NITK"
          };
          
          nodemailer.createTransport({
          service: 'gmail',
          auth: {
          user: "simhapranav.3@gmail.com",
          pass: process.env.NODE_MAIL_PASSCODE
          },
          port: 465,
          host: 'smtp.gmail.com'
          })
          
          .sendMail(msg , (err)=>{
          if (err) {
          return console.log('Error occurs', err);
          }else{
          return console.log('Email Sent');
          }
          });
        
        foundUser.save(async function(){
 
         try {
 
           let item1 = await x.x3(code1);
       
           let item2 = await x.x3(code2);
 
           let item3 = await x.x4(current_student_id);
 
           await x.x5(item1[0].title,item1[0].code,item1[0].faculty_id,item1[0].faculty,current_student_id,item3[0].name);
       
           await x.x5(item2[0].title,item2[0].code,item2[0].faculty_id,item2[0].faculty,current_student_id,item3[0].name);
       res.redirect("/coursesstudent");
         }
       
         catch (err) {
           console.log(err);
         }
         
       });
 
       }
     }
   });

  }

  else{
    courseError="(Don't choose same course more than once)";
    res.redirect("/courseregistration");
  } 
   });  

router.get("/allcoursesstudent",async function(req,res){
  if (req.isAuthenticated()){

    try {
      let items = await x.x21(current_student_id);

        res.render("student/course_view_st",{listItems: items,
        current: current_student_id});
      }
    
      catch (err) {
        console.log(err);
      }

} else {
  res.redirect("/loginstudent");
}
});  

router.post("/viewspecificstudent", async function(req, res){
  code1=req.body.code;
  id=req.body.id;
  // items2 = await x.x31(id,code1);
  if (req.isAuthenticated()){

    try {
      items = await x.x22(id,code1);
      items1 = await x.x3(code1);
     
      let present=0;
      let absent=0;
        
        if(items.length!=0) {
        res.render("student/course_specific_st", {
          listTitle: code1,
          listItems: items,
          listItems1:items1
        });
       }
        else{
          
          res.redirect("/allcoursesstudent");
        }
      }
    
      catch (err) {
        console.log(err);
        res.redirect("/coursesstudent");

      }


      

} else {
  res.redirect("/loginstudent");
}
});


router.post("/seeatten", async function(req, res){
  code1=req.body.code;
  id=req.body.id;
  
  if (req.isAuthenticated()){

    try {
      let items2 = await x.x31(id,code1);
     
      let present=0;
      let absent=0;
      let total=items2.length;
      

      for(let i=0;i<items2.length;i++){
        if(items2[i].attended===true){
          present++;
        }
        else if(items2[i].attended===false){
          absent++;
        }
      }

      let present1=present;
      let absent1=absent;

        attendance = (present/(items2.length))*100;
        console.log(items2);
        console.log(items2.length);
        console.log(absent);
        console.log(present);
        console.log(attendance);

      let atten =attendance;
      let leaves=0;
      let attend=0;

      if(attendance>=75){
      while(atten>=75 && atten<=100){
          total=total+1.000;
          atten=(present1/total)*100;
          console.log(atten);
            if(atten>=75){
              leaves++;
            }
      }
    }

    else{
      while(atten>=0 && atten<=75){
        total=total+1.0;
        present1=present1+1;
        atten=(present1/total)*100;
        if(atten<=75){
          attend++;
        }
      }
    }   
    console.log("Leaves :"+leaves);
    console.log("Attend :"+attend);
    console.log(1/2);

      

        if(items.length!=0) {
        res.render("student/attendance_st", {
          listTitle: code1,
          listItems: items2,
          percent:Math.round(attendance),
          Present:present,
          Absent:absent,
          Leaves:leaves,
          Attend:attend,
          Total:items2.length
        });
       }
        else{
          res.redirect("/allcoursesstudent");
        }
      }
    
      catch (err) {
        console.log(err);
        res.redirect("/coursesstudent");

      }   

} else {
  res.redirect("/loginstudent");
}
});


module.exports={router,current_student_id,glogin,goo_id,hide};