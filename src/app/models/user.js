var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const saltRounds = 10;


var UserSchema = new Schema({
  username : {type : String, required : true, index : {unique : true }},
  password : {type : String, required : true},
  quoraUsername : {type : String, required : true},
  totalViews  : {type : Number}
});

UserSchema.pre('save', function(next){
  var user = this;

  //Hash the password only if the password has been modified
  if(!user.isModified('password')) return next();

  //Generate the hash
  bcrypt.genSalt(saltRounds, function(error, salt){
    if(error) return next(error);
    bcrypt.hash(user.password, salt, function(error, hash){
      if(error) return next(error);

      user.password = hash;
      next();
    });

  });

});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return  bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
