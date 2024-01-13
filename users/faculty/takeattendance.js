require("dotenv").config();
var express = require("express");
var router = express.Router();
var x = require("../../Postgresql/function");
var passport = require("passport");

let atten_code;
let atten_date;

router.post("/takeattendance", async (req, res) => {
  const code = req.body.code;
  const date = req.body.date;
  atten_code = req.body.code;
  atten_date = req.body.date;

  if (req.isAuthenticated()) {
    try {
      let items = await x.x16(code);

      for (let i = 0; i < items.length; i++) {
        await x.x27(
          items[i].faculty_id,
          items[i].student_id,
          items[i].student,
          items[i].faculty,
          code,
          date
        );
      }

      let items1 = await x.x28(date, code);
      console.log(items1);
      res.render("faculty/take_atten_fac", {
        listItems: items,
        date1: date,
        listItems1: items1,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.get("/takeattendance1", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      let items1 = await x.x28(atten_date, atten_code);
      console.log(items1);
      res.render("faculty/actual_atten_fac", {
        listItems: items,
        date1: atten_date,
        listItems1: items1,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/mark", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const date = req.body.date;

  if (req.isAuthenticated()) {
    try {
      await x.x29(code, name, date);
      res.redirect("/takeattendance1");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/demark", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const date = req.body.date;

  if (req.isAuthenticated()) {
    try {
      await x.x30(code, name, date);
      res.redirect("/takeattendance1");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

module.exports = { router };
