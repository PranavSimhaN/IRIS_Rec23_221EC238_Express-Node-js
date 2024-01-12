require("dotenv").config();
var express = require("express");
var router = express.Router();
const session = require("express-session");
var x = require("../Postgresql/function");
var passport = require("passport");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

var User = require("../models/user");
var Counter1 = require("../models/counter1");

let code1; // /coursesfaculty
let current_faculty_id;

router.get("/faculty", async (req, res) => {
  res.render("faculty/home_fac.ejs");
});

router.get("/registerfaculty", function (req, res) {
  res.render("faculty/register_fac");
});

router.get("/loginfaculty", function (req, res) {
  atten_code = "";
  atten_date = "";
  res.render("faculty/login_fac");
});

router.post("/registerfaculty", function (req, res) {
  const name = req.body.name;
  const department = req.body.branch;
  const user_name = req.body.username;

  if (req.body.conpassword === req.body.password && name != "NULL") {
    Counter1.findOneAndUpdate(
      { code: "autoval" },
      { $inc: { seq: 1 } },
      { new: true },
      (err, cd) => {
        let seqId;
        if (cd == null) {
          const newval = new Counter1({ code: "autoval", seq: 1 });
          newval.save();
          seqId = 1;
        } else {
          seqId = cd.seq;
        }

        const Faculty_ID = seqId;

        User.register(
          { username: req.body.username },
          req.body.password,
          function (err, user) {
            if (err) {
              console.log(err);
              res.render("faculty/register_fac");
            } else {
              passport.authenticate("local")(req, res, function () {
                user.name = name;
                user.department = department;
                user.fac_id = Faculty_ID;
                current_faculty_id = user.fac_id;
                user.save(async function () {
                  const msg = {
                    from: "simhapranav.3@gmail.com",
                    to: user_name,
                    subject: "IRIS NITK",
                    text:
                      "Hello " +
                      name +
                      ", " +
                      Faculty_ID +
                      " is your Faculty-ID." +
                      "From IRIS NITK",
                  };

                  nodemailer
                    .createTransport({
                      service: "gmail",
                      auth: {
                        user: "simhapranav.3@gmail.com",
                        pass: process.env.NODE_MAIL_PASSCODE,
                      },
                      port: 465,
                      host: "smtp.gmail.com",
                    })

                    .sendMail(msg, (err) => {
                      if (err) {
                        return console.log("Error occurs", err);
                      } else {
                        return console.log("Email Sent");
                      }
                    });
                  await x.x18(name, department);

                  res.redirect("/loginfaculty");
                });
              });
            }
          }
        );
      }
    );
  } else {
    const errorMessage = "(Fill all the details and match both passwords)";
    console.log(errorMessage);
    res.render("faculty/register_fac");
  }
});

router.post("/loginfaculty", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    fac_id: req.body.fac_id,
  });

  current_faculty_id = user.fac_id;
  console.log(current_faculty_id);

  User.findOne({ fac_id: user.fac_id }, function (err, foundUser) {
    if (err) {
      //   console.log(err);
      res.redirect("loginfaculty");
    } else {
      if (foundUser) {
        if (foundUser.username === user.username) {
          req.login(user, function (err) {
            if (err) {
              console.log(err);
            } else {
              passport.authenticate("local")(req, res, function () {
                hide = foundUser.c_button;
                current_faculty_id = foundUser.fac_id;
                res.redirect("/coursesfaculty");
              });
            }
          });
        } else {
          res.redirect("loginfaculty");
        }
      }
    }
  });
});

router.get("/coursesfaculty", async function (req, res) {
  if (req.isAuthenticated()) {
    console.log(current_faculty_id);
    try {
      let items = await x.x13(current_faculty_id);
      // console.log(result);
      res.render("faculty/courses_fac", {
        listTitle: "YOUR COURSES",
        listItems: items,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/coursesfaculty", async function (req, res) {
  code1 = req.body.code;

  if (req.isAuthenticated()) {
    try {
      items = await x.x15(code1);

      console.log(items.length);

      if (items.length != 0) {
        res.render("faculty/view_courses_fac", {
          listTitle: code1,
          listItems: items,
        });
      } else {
        res.redirect("/coursesfaculty");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/coursesfaculty");
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

let hide = "";

router.get("/gotocourseapproval", async function (req, res) {
  if (req.isAuthenticated()) {
    try {
      items = await x.x16(code1);
      const d = new Date("Jan 9, 2024 23:59:00");
      let day = d.getUTCDate();
      let month = d.getUTCMonth();
      let year = d.getUTCFullYear();
      console.log(year);
      console.log(day);
      console.log(month);
      hide = "";
      if (month >= 0 && day >= 10 && year >= 2024) {
        hide = "hidden";
      }

      res.render("faculty/course_approve_fac", {
        listTitle: code1,
        listItems: items,
        hidden: hide,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/deletestudent", async function (req, res) {
  const code = req.body.code;
  const name = req.body.name;
  if (req.isAuthenticated()) {
    try {
      await x.x19(code, name);
      res.redirect("/gotocourseapproval");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.get("/uploadmarks", async function (req, res) {
  if (req.isAuthenticated()) {
    try {
      items = await x.x16(code1);

      res.render("faculty/course_marks_fac", {
        listTitle: code1,
        listItems: items,
        hidden: hide,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/midsem", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const midsem = req.body.midsem;

  if (req.isAuthenticated()) {
    try {
      await x.x23(midsem, code, name);
      res.redirect("/uploadmarks");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/endsem", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const endsem = req.body.endsem;

  if (req.isAuthenticated()) {
    try {
      await x.x24(endsem, code, name);
      res.redirect("/uploadmarks");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.post("/grade", async (req, res) => {
  const name = req.body.name;
  const code = req.body.code;
  const grade = req.body.grade;

  if (req.isAuthenticated()) {
    try {
      await x.x25(grade, code, name);
      res.redirect("/uploadmarks");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

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

router.post("/upload", upload.single("link"), async (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  link = req.file.path;
  console.log(link);
  code = req.body.code;
  if (req.isAuthenticated()) {
    try {
      await x.x33(link, code);
      res.redirect("/coursesfaculty");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/loginfaculty");
  }
});

router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    hide = "";
    current_faculty_id = "";
    res.redirect("/");
  });
});

module.exports = { router };
