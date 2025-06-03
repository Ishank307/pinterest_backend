var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const localStratergy=require('passport-local');
passport.use(new localStratergy(userModel.authenticate()));
const upload=require('./multer');


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


router.get('/alluserposts', async function (req, res, next) {
  let user = await userModel.findOne({
    _id: "6838beccddc6e09da3d61fa8"
  }).populate('posts')
  res.send(user)

}),

router.get('/login',function(req,res,next){
  res.render('login',{error:req.flash('error')});
})

router.get('/feed',function(req,res){
  res.render('feed');
})


router.get('/profile',isLoggedIn,async function(req,res,next){
  const user= await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('profile',{user});

})

  router.post('/register', (req, res, next) => {
    const { username, email, fullName } = req.body;
    const userData = new userModel({ username, email, fullName });

    userModel.register(userData, req.body.password).then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      })
    })

  });


  router.post('/login', passport.authenticate('local',{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash:true,
  }),function(req,res){});

  router.get('/logout',(req,res,next)=>{
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
  });

  function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) return next();
    res.redirect('/')

  }



router.get('/createPost', async function (req, res, next) {
  let createdpost = await postModel.create(
    {
      postText: "kaise ho sab",
      user: "6838beccddc6e09da3d61fa8",
    });
  let user = await userModel.findOne({});
  user.posts.push(createdpost.id);
  await user.save();
  res.send("done");


  // res.send(createdpost)

});

router.post('/upload',isLoggedIn,upload.single('file'),(req,res)=>{
  if(!req.file){
    return res.status(400).send("no files were uploaded")
  }
  res.send('file succesfully uploaded')
});


module.exports = router;
