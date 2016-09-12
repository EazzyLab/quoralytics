var express = require('express');
var bodyParser = require('body-parser');
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
        res.status(200).send({success:false, message:'Hello'});
      });
    }

    });
  });
  //////////////////////////////////////////////////////////////////////////////

  return apiRouter;
};
