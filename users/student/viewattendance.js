require('dotenv').config();
var express=require("express");
var router=express.Router();
var x =require("../../Postgresql/function");
var passport=require("passport");


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


module.exports={router};