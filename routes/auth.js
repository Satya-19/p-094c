var express = require('express')
var router = express.Router()
var passport = require("passport");
var localStrategy = require("passport-local");
var nodemailer = require('nodemailer')

var Database = require('../models/placementSchema')
var User = require('../models/authSchema')
var resetRequest = require('../models/resetRequest');


router.use(passport.initialize());
router.use(passport.session());

router.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type: "OAuth2",
        user: "placementcet2022@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

router.get('/forgotpassword', (req, res) => {
    res.render('forgotPassword')
})

router.get('/resetpassword/:resetRequestID', function(req, res) {
	res.render('resetPassword');
})

router.post('/register', (req, res) => {
    const {username, email} = req.body
    const newUser = new User({ username, email })

    Database.findOne({ RegdNo: username, Email: email }, (err, data) => {
        if(err || !data)
            return res.redirect('/login?err=Email or Registration Number is NOT in Database')
        else {
            User.register(newUser, req.body.password, (err, nUser) => {
                if(err)
                    return res.redirect(`/login?err=${err.message}`)  

                const accountRequest = new resetRequest({ r_id: nUser._id })
                accountRequest.save(err => {
                    if(err)
                        return res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                    
                    return
                })

                transporter.sendMail({
                    from: 'placementcet2022@gmail.com',
                    to: nUser.email,
                    subject: `New Account Created by the User Bearing Registration Number ${nUser.username}`,
                    text: `Dear Student,\n\nWe recieved a request to create a new account for Placement Website. If this wasn't you, please change your password here immediately: https://placement-web.herokuapp.com/forgotpassword , otherwise please go to the following link to verify your account:\nhttps://placement-web.herokuapp.com/verifyaccount/${accountRequest._id}\n\nThis link is valid only for 1 day for the student bearing Registration Number ${nUser.username}. So kindly verify your email within 24 hours.\n\nRegards,\nPlacement Cell CET Bhubaneswar.`
                }, (error, info) => {
                    if(error)
                        res.redirect('/login?err=Sorry, There seems to be a problem at our end');
                    else
                        res.redirect('/login?msg=Please check your E-Mail (also check your spam folder) to verify your account')
                })
            })
        }
    })
})

router.get('/verifyaccount/:accountID', (req, res) => {
    resetRequest.findByIdAndDelete(req.params.accountID, (err, data) => {
        if(err || !data)
            return res.redirect('/login?err=Invalid Verification Link')
        else {
            User.findByIdAndUpdate(data.r_id, { $set: { active: true }}, { new: true }, (err) => {
                if(err)
                    return res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                
                res.redirect('/login?msg=Account Verified Successfully')
            })
        }
    })
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
         return console.log(err); 
        }
      if (!user) {
         return res.redirect(`/login?err=A User with the given Credentials doesn't Exist`); 
        }

      if(!user.active) {
          return res.redirect('/login?err=Your Account has NOT been Verified. Please check your mail.')
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

router.post('/forgotpassword', (req, res, next) => {
    const {username, email} = req.body

    User.findOne({ username: username, email: email }, (err, stud) => {
        if(err)
            res.redirect('/login?err=Sorry, There seems to be a problem at our end')
        else if(!stud)
            res.redirect('/login?err=An account with the given credentials does not exist')
        else {
            const passwordRequest = new resetRequest({ r_id: stud._id })
            passwordRequest.save((err) => {
                if(err)
                    res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                
                return
            })

            transporter.sendMail({
                from: 'placementcet2022@gmail.com',
                to: stud.email,
                subject: 'Reset Password for Your Account',
                text: `Dear Student,\n\nWe recieved a request to reset your password for Placement Website. If this wasn't you, you can safely ignore this email, otherwise please go to the following link to reset your password:\nhttps://placement-web.herokuapp.com/resetpassword/${passwordRequest._id}\n\nThis link is valid only for 1 day for the student bearing Registration Number ${stud.username}. So kindly change your password within 24 hours.\n\nRegards,\nPlacement Cell CET Bhubaneswar.`
            }, (error, info) => {
                if(error)
                    res.redirect('/login?err=Sorry, There seems to be a problem at our end');
                else
                    res.redirect('/login?msg=Please check your E-Mail (also check your spam folder) for instructions on how to reset your password')
            })
        }
    })
})

router.post('/resetpassword/:resetRequestID', (req, res, next) => {
    resetRequest.findByIdAndDelete(req.params.resetRequestID, (requestError, resetPass) => {
        if(requestError || !resetPass)
            return res.redirect('/login?err=Invalid password reset link, Please go to Forgot Password to request another link')
        else {
            User.findByIdAndUpdate(resetPass.r_id, { $set: { active: true }}, { new: true }, (userError, user) => {
                if(userError)
                    return res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                user.setPassword(req.body.password, (hashingError, updatedUser) => {
                    if(hashingError || !updatedUser)
                        return res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                    else {
                        updatedUser.save((err) => {
                            if(err)
                                return res.redirect('/login?err=Sorry, There seems to be a problem at our end')
                            else
                                res.redirect('/login?msg=Your password has been successfully reset')
                        })
                    }
                })
            })
        }
    })
})

router.get('/logout', (req, res) => {
    req.logOut()
    req.session.destroy(err => {
        if(err)
            console.log(err)
    })
    res.redirect('/login?msg=User Logged out Successfully')
})

module.exports = router;