var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = "secret"
var surgeon_solutions = mongoose.createConnection('mongodb://localhost/surgeon_solutions');

var UserSchema = new mongoose.Schema({
  firstName: {type: String, lowercase: true},
  lastName: {type: String, lowercase: true},
  email: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  type: String,
  isAuthorized: {type: Boolean, default:false},
  isAdmin: {type: Boolean, default:false}
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 1);

	return jwt.sign({
		_id: this._id,
		email: this.email,
	 exp: parseInt(exp.getTime() / 1000),
	}, secret);
};

var User = surgeon_solutions.model('User', UserSchema);
module.exports = User;
