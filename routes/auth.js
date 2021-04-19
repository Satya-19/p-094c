var express = require('express')
var router = express.Router()
var passport = require("passport");
var localStrategy = require("passport-local");

var Database = require('../models/placementSchema')
var User = require('../models/authSchema')


router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post('/register', (req, res) => {
    const {username, email} = req.body
    const newUser = new User({ username })

    Database.findOne({ RegdNo: username, Email: email }, (err, data) => {
        if(err || !data)
            res.redirect('/login?err=Email or Registration Number is NOT in Database')
        else {
            User.register(newUser, req.body.password, (err) => {
                if(err)
                    return res.redirect(`/login?err=${err.message}`)  
                
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/profile?msg=User Registered Successfully");
                });
            })
        }
    })
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
         return console.log(err); 
        }
      if (!user) {
         return res.redirect(`/login?err=${info.message}`); 
        }

    req.logIn(user, function(err) {
        if (err) {
           return console.log(err); 
        } else {
            res.redirect('/profile?msg=User Logged in Successfully');
        }
      });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login?msg=User Logged out Successfully')
})

module.exports = router;