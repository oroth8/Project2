var db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const path=require("path");
// Routes
// =============================================================
module.exports = function(app) {

    app.get("/", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
      });
      
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        console.log("Here we are!");
        res.sendFile(path.join(__dirname, "../public/login.html"));
      });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });




    app.get("*", function(req, res) {
        res.render("index", {data:"Hello World!"})
    });

};