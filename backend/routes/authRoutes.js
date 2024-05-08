const express = require('express');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const router = express.Router();
const userController = require('../controllers/userController'); // Assuming controllers is one directory up
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'http://localhost:3000/api/auth/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
  cb(null,{id:profile.id,username:profile.displayName})
}));

passport.serializeUser(function(user, cb) {
  cb(null,{id:user.id,username:user.username})
});

passport.deserializeUser(function(user, cb) {
 cb(null,user)
});
router.get('/login/federated/google', passport.authenticate('google'));


router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));





// Route for user signup
router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    // Email validation using validator
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// Route for user login
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// Route for Google OAuth2.0 authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling Google OAuth2.0 callback
router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: '/login' ,
  successRedirect:'/home'
}), (req, res) => {
  // Successful authentication, redirect or respond with JSON as needed
  res.redirect('/');
});

// Route for getting a user by ID (assuming it's a protected route)
router.get('/users/:id', passport.authenticate('jwt'), userController.getUserById); // Protected route
router.get('/display',(req,res)=>{
  res.json({message:'works'})
})
// Route for deleting a user by ID (assuming it's a protected route)
router.delete('/users/:id', passport.authenticate('jwt'), userController.deleteUser); // Protected route

module.exports = router;
