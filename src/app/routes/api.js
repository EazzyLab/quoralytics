var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/user');

var secret = config.secret;

module.exports = function(app, express){

  var apiRouter = express.Router();

////////////////////////////////////////////////////////////////////////////////
  apiRouter.post('/register', function(req, res){

    var username = req.body.username;
    var password = req.body.password;
    var quoraUsername = req.body.quoraUsername;

    var currentUser = new User({
      username : username,
      password : password,
      quoraUsername : quoraUsername
    });

    User.findOne({username:username}, function(error, user){
      if(error){
      res.status(200).send({success:false, message:error});
    } else if(user){
      res.status(200).send({success:false, message:'Username already taken. Please choose something else !'});
    } else {
      currentUser.save(function(error, user){
        if(error){
          res.status(200).send({success:false, message:error});
        }
        res.status(200).send({success:true, message:'Hello'});
      });
    }

    });
  });
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  apiRouter.post('/login', function(req, res){

  var username = req.body.username;
  var password = req.body.password;

    User.findOne({'username':username}, function(error, user){
      if(error){
        res.status(200).send({success:false, message:error});
      } else if(!user){
        res.status(200).send({success:false, message:'This username doesn\'t exist.'});
      } else if(user){
          if(user.comparePassword(password)){
            jwt.sign({username:user.username,user_id:user._id}, secret, {expiresIn:'360000'}, function(error, token){
              if(error){
                res.status(200).send({success:false, message:error});
              } else {
                res.status(200).send({success:true, message:'Welcome back', token:token});
              }
            });
          } else {
            res.status(200).send({success:false, message:'Incorrect password.'});
          }
      }
    });
  });
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  apiRouter.use(function(req, res, next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('coming trough the Middleware');

    if(token){
      console.log(token);
      jwt.verify(token, secret, function(error, decoded){
        if(error){
          res.status(403).send({
            success:false,
              message:error
          });
        } else {
          req.token = decoded;
          console.log('Token is valid');
          next();
        }
      });
    } else {
      console.log('No Token Provided');
      res.status(403).send({
        succes:false,
        message:'No token provided'
      });
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  apiRouter.get('/updateStats', function(req, res){
    console.log('Someone on Hola');
    var totalViews = Math.floor(Math.random() * (1000));
    var totalViewsChange = Math.floor(Math.random() * (100));
    res.status(200).send({success:true,totalViews:totalViews,totalViewsChange:totalViewsChange});
  });
////////////////////////////////////////////////////////////////////////////////

  return apiRouter;
};
