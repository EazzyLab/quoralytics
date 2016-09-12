var express = require('express');
var bodyParser = require('body-parser');
//var jwt = require('jwt');
var bcrypt = require('bcrypt');
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

  console.log('User trying to log in, username : ', username, ', password : ', password);

    User.findOne({'username':username}, function(error, user){
      if(error){
        res.status(200).send({success:false, message:error});
      } else if(!user){
        res.status(200).send({success:false, message:'This username doesn\'t exist.'});
      } else if(user){
          if(user.comparePassword(password)){
            res.status(200).send({success:true, message:'Welcome back'});
          } else {
            res.status(200).send({success:false, message:'Incorrect password.'});
          }
      }
    });
  });
  //////////////////////////////////////////////////////////////////////////////

  return apiRouter;
};
