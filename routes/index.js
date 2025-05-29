var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postModel = require('./post');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newUser', async function (req, res, next) {
  let createdUser= await userModel.create({
    username: "ishank",
    password: "ishank230",
    posts: [],
    email:"ishankkumar307@gmail.com",
    fullName:"Ishank Kumar"
  })
});


module.exports = router;
