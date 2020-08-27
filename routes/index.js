var express = require('express');
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

/* GET gallery page. */
router.get('/gallery', (req, res) => {
  res.render('gallery');
});

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('register');
});

/* GET contact us page. */
router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;