require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const verifySid = "VAa05ce4f2b0c161a4f7df9b8d2b4abf5f";

var User = require("../test i/models/user");
var Counter = require("../test i/models/counter");
var Counter1 = require("../test i/models/counter1");
const x = require("./Postgresql/function");

var student = require("./users/student/student");
var admin = require("./users/admin");
var faculty = require("./users/faculty");
var cousrse_feedback_student = require("./users/student/coursefeedback");
var attendance_student = require("./users/student/viewattendance");

const app = express();
const port = 3000;

// app.use(express.static("public"));
app.use("/public/", express.static("./public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true })
  .then(() => console.log("connected successfully...."))
  .catch((err) => console.log(err));
// mongoose.set("useCreateIndex", true);mongoose.set("useCreateIndex", true);
mongoose.set("strictQuery", true);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// ------------------------------------->Student<-------------------------------------------

app.use(student.router);
app.use(cousrse_feedback_student.router);
app.use(attendance_student.router);

// ------------------------------------->Admin<-------------------------------------------

app.use(admin.router);

// ------------------------------------->Faculty<-------------------------------------------

app.use(faculty.router);

// ------------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
