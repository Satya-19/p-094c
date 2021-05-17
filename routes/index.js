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
    
  let err, msg
  if(req.query.msg)
    msg = req.query.msg
  else if(req.query.err)
    err = req.query.err

  res.render('login_student', { err, msg });
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
    registered_companies = await company.find({ data: student_data._id })
  } catch (err) {
      return next(err)
  }

  let err, msg
  if(req.query.msg)
    msg = req.query.msg
  else if(req.query.err)
    err = req.query.err

  return res.render('dashboard/profile', { data1: upcoming_placements, data2: registered_companies, student: student_data, err, msg })
})

router.get("/prevplacement", isLoggedIn, (req, res, next) => {
  const NowDate = new Date()
  company.find({ date: { $lt: NowDate }}, (err, compa) => {

    if(err)
      next(err)
    else if(!compa.length)
      res.render('dashboard/prevplacement', { compa, msg: "No Companies" })
    else {
      res.render('dashboard/prevplacement', { compa })
    }
  })
})

router.get('/admin_portal', isAdmin, (req, res) => {

  let err, msg
  if (req.query.err)
    err = req.query.err
  else if (req.query.msg)
    msg = req.query.msg

  company.find({}, (error, compa) => {
    if(error)
      res.render('dashboard/admin_portal', { compa, err, msg })
    else if(!compa.length)
      res.render('dashboard/admin_portal', { compa, err: "No Companies Found", msg })
    else
      res.render('dashboard/admin_portal', { compa, err, msg })
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
      return res.redirect('/admin_portal?err=A form with the given URL already exists');
    }
    return res.redirect('/admin_portal?msg=Form Created Successfully');
  })
})

router.post('/admin_portal/EditStud', isAdmin, (req, res) => {
  Database.findOne({ RegdNo: req.body.regdno }, (err, stud) => {
    if(err || !stud)
      return res.redirect('/admin_portal?err=No Student Exists with the Given Regd No')
    else
      res.render('dashboard/admin_student_data', { student: stud })
  })
})

router.post('/admin_portal/:regdno', isAdmin, (req, res) => {
  Database.findOneAndUpdate({ RegdNo: req.params.regdno }, req.body, (err, data) => {
    if(err)
      return res.redirect('/admin_portal?err=Some Error Occured')
    else
      res.redirect("/admin_portal?msg=Student's Data Updated Successfully")
  })
})

router.get('/admin_portal/database', isAdmin, (req, res) => {
  Database.find({}, "-_id").lean().exec((err, data) => {
    if(err)
      return res.redirect('/admin_portal?err=There seems to be a problem. Please try later.')

    res.xls("Current Database.xlsx", data)
  })
})

router.get("/form/:name", isLoggedIn, (req, res, next) => {
  company.findOne({ slug: req.params.name }, (err, compa) => {
    if(err){
       return next(err);
    }
  
    if(!compa)
      return res.redirect('/profile?err=No Company Found')

    var flag = 0 

    for(var i = 0; i < compa.data.length; i++) {
      if(compa.data[i].equals(req.session.userData._id)) {
        flag = 1
        break
      }
    }

    if(flag) {
      return res.render("dashboard/company", { company: compa, student: req.session.userData, msg: "found" })
    }
    return res.render("dashboard/company", { company: compa, student: req.session.userData, msg: "not found" })
      
  })
})

router.post("/form/:name", isLoggedIn, (req, res, next) => {
  company.findOneAndUpdate({ slug: req.params.name }, 
  { $pull: { data: req.session.userData._id }}, { new: true },
  (err) => {
    if(err) {
      console.log(err)
      next(err)
    }
    else {
      res.redirect('/profile?msg=Deregistered Successfully')
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
      res.redirect("/admin_portal?msg=Form Edited Successfully")
    }
  })
})

router.post("/form/:name/delete/:id", isAdmin, (req, res, next) => {
  company.findByIdAndDelete(req.params.id, (err) => {
    if(err)
      next(err)
    else
      res.redirect("/admin_portal?msg=Form deleted successfully")
  })
})

router.get("/form/:name/download", isAdmin, (req, res, next) => {
  company.findOne({ slug: req.params.name }).lean().exec((err, data) => {
    if(err)
      return next(err)
    else {
      const arr = data.data
      
      if(!arr.length)
        return res.redirect('/admin_portal?err=No Student has Applied yet')

      const required = data.requiredFields
      required.push('-_id')

      Database.find({ _id: { $in: arr }}, required).lean().exec((err, stud) => {
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
      return res.redirect('/profile?err=No Company Found');
    }

    for(var i = 0; i < company.data.length; i++) {
      if(company.data[i].equals(req.session.userData._id)) {
        return res.redirect('/profile?err=You have aready registered')
      }
    }

    const { MinTenPerc, MinTwePerc, MinBack, MinBCGPA, MinMCGPA, MinYearGap } = company.Eligibility
    
    if(MinTenPerc > req.session.userData.TenPercentage) {
      return res.redirect("/profile?err=Your 10th Percentage doesn't meet the Eligibility Criteria")
    }
    
    if(MinTwePerc > req.session.userData.TwelvePercentage || MinTwePerc > req.session.userData.DiplomaPercentage) {
      return res.redirect("/profile?err=Your 12th or Diploma Percentage doesn't meet the Eligibility Criteria")
    }
    
    if(MinBack < req.session.userData.Backlogs) {
      return res.redirect("/profile?err=Your Active Backlogs doesn't meet the Eligibility Criteria")
    }
    
    if(MinBCGPA > req.session.userData.BCGPA) {
      return res.redirect("/profile?err=Your Bachelors Degree CGPA doesn't meet the Eligibility Criteria")
    }
    
    if(req.session.userData.MCGPA != 0 && MinMCGPA > req.session.userData.MCGPA) {
      return res.redirect("/profile?err=Your Masters Degree CGPA doesn't meet the Eligibility Criteria")
    }
    
    if(MinYearGap < req.session.userData.YearGap) {
      return res.redirect("/profile?err=Your Number of Year Gaps doesn't meet the Eligibility Criteria")
    }

    company.data.push(req.session.userData);
    company.save((err) => {
      if(err){
        return next(err);
      }
      return res.redirect('/profile?msg=Successfully Applied for ' + company.name);
    })
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect("/login?err=Authenticate Yourself to Proceed Further");
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "admin") {
    return next()
  }
  else if (req.isAuthenticated())
    return res.redirect("/profile?err=You are NOT the Admin")

  res.redirect("/login?err=You are NOT the Admin")
}

module.exports = router;