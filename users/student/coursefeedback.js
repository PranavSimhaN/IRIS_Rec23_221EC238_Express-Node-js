require("dotenv").config();
var express = require("express");
var router = express.Router();
const session = require("express-session");
var x = require("../../Postgresql/function");
var passport = require("passport");

let code3;
let current_student_id;

router.post("/coursefeedback", async function (req, res) {
  code = req.body.code;
  title = req.body.title;
  student = req.body.student;
  faculty = req.body.faculty;
  student_id = req.body.student_id;
  faculty_id = req.body.faculty_id;
  code3 = code;
  current_student_id = student_id;

  if (req.isAuthenticated()) {
    await x.x34(faculty_id, student_id, student, faculty, code, title);

    try {
      res.redirect("/feedback");
    } catch (err) {
      console.log(err);
      res.redirect("/coursesstudent");
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.get("/feedback", async function (req, res) {
  if (req.isAuthenticated()) {
    try {
      items = await x.x35(current_student_id, code3);

      res.render("student/course_feedback", {
        listItems: items,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/helpful", async (req, res) => {
  const id = req.body.id;
  const code = req.body.code;
  const helpful = req.body.helpful;

  if (req.isAuthenticated()) {
    try {
      await x.x36(helpful, code, id);
      res.redirect("/feedback");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/rating", async (req, res) => {
  const id = req.body.id;
  const code = req.body.code;
  const rating = req.body.rating;

  if (req.isAuthenticated()) {
    try {
      await x.x37(rating, code, id);
      res.redirect("/feedback");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/feedback", async (req, res) => {
  const id = req.body.id;
  const code = req.body.code;
  const feedback = req.body.feedback;

  if (req.isAuthenticated()) {
    try {
      await x.x38(feedback, code, id);
      res.redirect("/feedback");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/submitfeedback", async (req, res) => {
  const id = req.body.id;
  const code = req.body.code;
  const button = req.body.button;

  if (req.isAuthenticated()) {
    try {
      await x.x39(button, code, id);
      res.redirect("/allcoursesstudent");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/feedbackdelete", async (req, res) => {
  const id = req.body.id;
  const code = req.body.code;
  const appli_id = req.body.appli_id;

  if (req.isAuthenticated()) {
    try {
      await x.x40(id, code, appli_id);
      res.redirect("/feedback");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginstudent");
  }
});

router.post("/viewpdf", async function (req, res) {
  code1 = req.body.code;

  if (req.isAuthenticated()) {
    try {
      items1 = await x.x3(code1);
      res.render("student/pdf_view_student", {
        listItems1: items1,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/coursesstudent");
    }
  } else {
    res.redirect("/loginstudent");
  }
});

module.exports = { router };
