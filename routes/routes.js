const express = require('express');
const router = express.Router();
const orders= require("../India-Bazaar/models/login");
const fs = require('fs');

module.exports = router
// for google authentication--
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
      {
        clientID: '809318911396-k49tfu12oqt228hiqlitcq254srfqrrq.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        Login.findOne({ googleId: profile.id }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            // Create a new user if not found
            const newUser = new Login({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails,
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          } else {
            return done(null, user);
          }
        });
      }
    )
  );

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});
  
  router.use(passport.initialize());
  router.use(passport.session());
  
  // Routes
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
  
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/con' }),
    (req, res) => {
      res.redirect('/');
    }
  );

router.get("/", (req, res) => {
    res.render("home");
})
router.get("/order", (req, res) =>{
    res.render("order")
})

router.get("/item/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if(err){
            res.redirect("home");
        } else{
            if(user == null){
                res.redirect("home");
            }
            else{
                res.render("order", {
                    user: user
                });
            }
        }
    });
});