var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postModel = require('./post');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newUser', async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Kumar",
    password: "Kumar230",
    posts: [],
    email: "ishankar307@gmail.com",
    fullName: "Isasdank Kumar"
  });


  res.send(createdUser);
});


router.get('/alluserposts', async function (req,res,next) {
  let user = await userModel.findOne({
    _id:"6838beccddc6e09da3d61fa8"
  }).populate('posts')
  res.send(user)
  
})


router.get('/createPost', async function (req, res, next) {
  let createdpost= await postModel.create(
    {
      postText: "kaise ho sab",
      user:"6838beccddc6e09da3d61fa8",
    });
    let user= await userModel.findOne({});
    user.posts.push(createdpost.id);
    await user.save();
    res.send("done");


    // res.send(createdpost)

})


module.exports = router;
