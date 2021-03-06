var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET route for homepage
router.get('/', function (req, res, next) 
{
  return res.sendFile(path.join(__dirname + '/UI/index.html'));
});

//POST route for updating data
router.post('/', function (req, res, next) 
{
  
  if (req.body.password !== req.body.passwordcheck) 
  {
    var err = new Error('Password doesn\'t match!');
    err.status = 400;
    res.send('Password doesn\'t match!');
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordcheck) 
  {
    var userData =
    {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordcheck: req.body.passwordcheck,
    }

    User.create(userData, function (error, user)
    {
      if (error) 
      {
        return next(error);
      } 
      else 
      {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    }
    );

  } 
  else if (req.body.logemail && req.body.logpassword) 
  {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) 
    {
      if (error || !user) 
      {
        var err = new Error('Wrong email or password!');
        err.status = 401;
        return next(err);
      } 
      else 
      {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    }
    );
  } 
  else 
  {
    var err = new Error('All blanks are required');
    err.status = 400;
    return next(err);
  }
})

// GET route to redirect to '/profile' page after registering
router.get('/profile', function (req, res, next) 
{
  User.findById(req.session.userId)
    .exec(function (error, user) 
    {
      if (error) 
      {
        return next(error);
      } else 
      {
        if (user === null) 
        {
          var err = new Error('You are not authorised');
          err.status = 400;
          return next(err);
        }
        else 
        {
          return res.send('<h2>Your name: </h2>' + user.username + '<h2>Your email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout
router.get('/logout', function (req, res, next) 
{
  if (req.session)
  {
    // delete the created session object
    req.session.destroy(function (err) 
    {
      if (err) 
      {
        return next(err);
      } 
      else 
      {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;