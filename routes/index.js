var express = require('express');
var showdown = require('showdown');
var company = require('../models/companySchema');
var Database = require('../models/placementSchema');
 
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index/index', {
    title: 'Express'
  });
});

/* GET About Us page. */
router.get('/about', (req, res) => {
  res.render('about/about');
});

/* GET Placement page. */
router.get('/placement', (req, res) => {
  res.render('placement');
});

/* GET Team page. */
router.get('/team', (req, res) => {
  res.render('team');
});

/* GET Why CET page. */
router.get('/whycet', (req, res) => {
  res.render('whycet');
});

/* GET login page. */
router.get('/login', (req, res) => {
  if(req.session.userData != undefined)
    return res.redirect('/profile')

  res.render('login_student', { msg: "" });
});

/* GET contact us page. */
router.get('/contact', (req, res) => {
  res.render('contact');
});


// **************************************************************************************** //


router.get('/profile', isLoggedIn, async (req, res, next) => {
  const NowDate = new Date();
  let upcoming_placements = [], registered_companies = [], student_data = {}
  
  try {
    upcoming_placements = await company.find({ date: { $gt: NowDate }})
  } catch (err) {
      return next(err)
  }

  if(req.session.userData == undefined) {
    try {
      student_data = await Database.findOne({ RegdNo: req.user.username })
      req.session.userData = student_data
    } catch (err) {
        return next(err)
    }
  } else {
    student_data = req.session.userData
  }

  try {
    registered_companies = await company.find({ data: student_data.RegdNo, date: { $gt: NowDate } })
  } catch (err) {
      return next(err)
  }

  return res.render('dashboard/profile', { data1: upcoming_placements, data2: registered_companies, student: student_data })
})

router.get("/prevplacement", isLoggedIn, (req, res, next) => {
  const NowDate = new Date()
  company.find({ date: { $lt: NowDate }}, (err, compa) => {

    if(err)
      next(err)
    else if(!compa.length) {
      req.flash("error", "No Companies Found")
      res.render('dashboard/prevplacement', { compa })
    } else {
      res.render('dashboard/prevplacement', { compa })
    }
  })
})

router.get('/admin_portal', isAdmin, (req, res) => {
  company.find({}, (error, compa) => {
    if(error)
      res.render('dashboard/admin_portal', { compa })
    else if(!compa.length) {
      req.flash("error", "No Companies Found")
      res.render('dashboard/admin_portal', { compa })
    } else
      res.render('dashboard/admin_portal', { compa })
  })
})

router.get('/userpage', isLoggedIn, (req, res) => {
  res.render('dashboard/user_page', { student: req.session.userData })
})

router.get('/adminform', isAdmin, (req, res) => {
  res.render('adminform')
})

router.post('/adminform', isAdmin, (req, res) => {
  let converter = new showdown.Converter({ simpleLineBreaks: true })
  let html = converter.makeHtml(req.body.desc)

  let cdate = new Date(req.body.date)
  let udate = new Date(cdate.getTime() + 86400000)

  company.create({ ...req.body, desc: html, date: udate }, (err) => {
    if(err){
      req.flash("error", "A form with the given URL already exists")
      return res.redirect('/admin_portal');
    }

    req.flash("success", "Form Created Successfully")
    return res.redirect('/admin_portal');
  })
})

router.post('/admin_portal/EditStud', isAdmin, (req, res) => {
  Database.findOne({ RegdNo: req.body.regdno }, (err, stud) => {
    if(err || !stud) {
      req.flash("error", "No Student Exists with the Given Regd No")
      return res.redirect('/admin_portal')
    }
      res.render('dashboard/admin_student_data', { student: stud })
  })
})

router.post('/admin_portal/:regdno', isAdmin, (req, res) => {
  Database.findOneAndUpdate({ RegdNo: req.params.regdno }, req.body, (err, data) => {
    if(err) {
      req.flash("error", "Some Error Occured... Please try again later.")
      return res.redirect('/admin_portal')
    }

    req.flash("success", "Student's Data Updated Successfully")
    res.redirect("/admin_portal")
  })
})

router.get('/admin_portal/database', isAdmin, (req, res) => {
  Database.find({}, "-_id").lean().exec((err, data) => {
    if(err) {
      req.flash("error", "Some Error Occured... Please try again later.")
      return res.redirect('/admin_portal')
    }

    res.xls("Current Database.xlsx", data)
  })
})

router.get("/form/:name", isLoggedIn, (req, res, next) => {
  company.findOne({ slug: req.params.name }, (err, compa) => {
    if(err){
       return next(err);
    }
  
    if(!compa) {
      req.flash("error", "No Company Found")
      return res.redirect('/profile')
    }

    var flag = 0 

    if (compa.Eldegree.includes(req.session.userData.Degree)) {
      if(compa.Bbranch.includes(req.session.userData.Branch) || compa.Mbranch.includes(req.session.userData.Branch)) {

        for(var i = 0; i < compa.data.length; i++) {
          if(compa.data[i] == req.session.userData.RegdNo) {
            flag = 1
            break
          }
        }

        if(flag)
          return res.render("dashboard/company", { company: compa, student: req.session.userData, msg: "found" })

        return res.render("dashboard/company", { company: compa, student: req.session.userData, msg: "not found" })
      }
    }
    
    return res.render("dashboard/company", { company: compa, student: req.session.userData, msg: "not eligible" })
  })
})

router.post("/form/:name", isLoggedIn, (req, res, next) => {
  company.findOneAndUpdate({ slug: req.params.name }, 
  { $pull: { data: req.session.userData.RegdNo }}, { new: true },
  (err) => {
    if(err) {
      console.log(err)
      next(err)
    }
    else {
      req.flash("success", "Deregistered Successfully")
      res.redirect('/profile')
    }
  })
})

router.get("/form/:name/update/:id", isAdmin, (req, res, next) => {
  company.findOne({ slug: req.params.name }, (err, compa) => {
    if(err)
      next(err)
    else
      res.render("edit_adminform", { compa })
  })
})

router.post("/form/:name/update/:id", isAdmin, (req, res, next) => {
  let converter = new showdown.Converter({ simpleLineBreaks: true })
  req.body.desc = converter.makeHtml(req.body.desc)

  company.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if(err)
      next(err)
    else {
      req.flash("success", "Form Edited Successfully")
      res.redirect("/admin_portal")
    }
  })
})

router.post("/form/:name/delete/:id", isAdmin, (req, res, next) => {
  company.findByIdAndDelete(req.params.id, (err) => {
    if(err)
      next(err)
    else {
      req.flash("success", "Form deleted successfully")
      res.redirect("/admin_portal")
    }
  })
})

router.get("/form/:name/download", isAdmin, (req, res, next) => {
  company.findOne({ slug: req.params.name }).lean().exec((err, data) => {
    if(err)
      return next(err)
    else {
      const arr = data.data
      
      if(!arr.length) {
        req.flash("error", "No Student has Applied yet")
        return res.redirect('/admin_portal')
      }

      const required = data.requiredFields
      required.push('-_id')

      Database.find({ RegdNo: { $in: arr }}, required).lean().exec((err, stud) => {
        if(err)
          return next(err)

        res.xls(data.name + " data.xlsx", stud)
      })
    }
  })
})

router.get("/form/:name/apply/:regno", isLoggedIn, (req, res, next) => {
  company.findOne({ slug: req.params.name }, (err, company) => {
    if(err){
       return next(err);
    }
    if(!company){
      req.flash("error", "No Company Found")
      return res.redirect('/profile');
    }

    for(var i = 0; i < company.data.length; i++) {
      if(company.data[i] == req.session.userData.RegdNo) {
        req.flash("error", "You have aready registered")
        return res.redirect('/profile')
      }
    }

    const { MinTenPerc, MinTwePerc, MinBack, MinBCGPA, MinMCGPA, MinYearGap } = company.Eligibility
    
    if(MinTenPerc != null && MinTenPerc > req.session.userData.TenPercentage) {
      req.flash("error", "Your 10th Percentage doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }
    
    if(MinTwePerc != null && (MinTwePerc > req.session.userData.TwelvePercentage || MinTwePerc > req.session.userData.DiplomaPercentage)) {
      req.flash("error", "Your 12th or Diploma Percentage doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }
    
    if(MinBack != null && MinBack < req.session.userData.Backlogs) {
      req.flash("error", "Your Active Backlogs doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }
    
    if(MinBCGPA != null && req.session.userData.BCGPA != 0 && MinBCGPA > req.session.userData.BCGPA) {
      req.flash("error", "Your Bachelors Degree CGPA doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }
    
    if(MinMCGPA != null && req.session.userData.MCGPA != 0 && MinMCGPA > req.session.userData.MCGPA) {
      req.flash("error", "Your Masters Degree CGPA doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }
    
    if(MinYearGap != null && MinYearGap < req.session.userData.YearGap) {
      req.flash("error", "Your Number of Year Gaps doesn't meet the Eligibility Criteria")
      return res.redirect("/profile")
    }

    company.data.push(req.session.userData.RegdNo);
    company.save((err) => {
      if(err){
        return next(err);
      }

      req.flash("success", "Successfully Applied for " + company.name)
      return res.redirect('/profile');
    })
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  req.flash("error", "Authenticate Yourself to Proceed Further")
  res.redirect("/login");
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "admin") {
    return next()
  }
  else if (req.isAuthenticated()) {
    req.flash("error", "You are NOT the Admin")
    return res.redirect("/profile")
  }

  req.flash("error", "You are NOT the Admin")
  res.redirect("/login")
}

module.exports = router;