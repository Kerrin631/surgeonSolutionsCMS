var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var multer = require('multer');
var passport = require('passport');
var path = require('path');
var s3 = require('s3');
var app = express();
// app.engine('.html', require('ejs').__express);
app.use(multer({ dest: './uploads/'}).single('file'));
app.use(morgan('dev')); // log every request to the console
app.set('views', __dirname + "/client/partials")
app.set('view engine', 'html')
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "./client")));

// This goes in our server.js file so that we actually use the mongoose config file!
require('./server/config/mongoose.js');
require('./passport/passport.js')

var client = s3.createClient({
	maxAsyncS3: 20,     // this is the default
	s3RetryCount: 3,    // this is the default
	s3RetryDelay: 1000, // this is the default
	multipartUploadThreshold: 20971520, // this is the default (20 MB)
	multipartUploadSize: 15728640, // this is the default (15 MB)
	s3Options: {
		accessKeyId: "accessKeyId",
		secretAccessKey: "secretAccessKey",
	}
});

// app.use(express.static(path.join(__dirname, "./client")));

//always require routes AFTER requiring mongoose
// require('./server/config/routes.js')(app, client);
var routes_setter = require('./server/config/routes.js');
routes_setter(app, client);

app.listen(8000, function() {
 console.log("listening on port 8000");
})

